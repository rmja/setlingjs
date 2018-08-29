import { DateTime, Duration } from "luxon";
import { StartOfUnit, startOf } from './start-of';

import { SettleRuleBuilder } from './settle-rule-builder';

const firstRegex = /^([_+-])?([a-zA-Z0-9]+)(.*)/;
const remainingRegex = /^([_+-])([a-zA-Z0-9]+)(.*)/;

export class SettleRule {
    parts: IPart[] = [];
    
    static parse(input: string) {
        const builder = new SettleRuleBuilder();
        let match = input.match(firstRegex);
        
        if (match) {
            addPart(match[1] || (match[2][0] === "P" ? "+" : "_"), match[2]);

            let remaining = match[3];
            while ((match = remaining.match(remainingRegex)) !== null) {
                addPart(match[1], match[2]);
                remaining = match[3];
            }
        }

        return builder.rule;

        function addPart(op: string, value: string) {
            switch (op) {
                case "_":
                    builder.startOf(<StartOfUnit>value);
                    break;
                case "+":
                    builder.plus(Duration.fromISO(value));
                    break;
                case "-":
                    builder.minus(Duration.fromISO(value));
                    break;
                default:
                    throw new Error();
            }
        }
    }

    settle(origin: DateTime) {
        for (const part of this.parts) {
            origin = part.apply(origin);
        }
        return origin;
    }

    valueOf() {
        return this.toString();
    }

    toString() {
        let string = "";
        for (const part of this.parts) {
            string += part.toRuleString(string.length > 0);
        }
        return string;
    }
}

export interface IPart {
    apply(origin: DateTime): DateTime;
    toRuleString(prefixWithSeparator: boolean): string;
}

export class StartOfPart implements IPart {
    constructor(private unit: StartOfUnit) {
    }

    apply(origin: DateTime): DateTime {
        return startOf(origin, this.unit);
    }

    toRuleString(prefixWithSeparator: boolean) {
        return (prefixWithSeparator ? "_" : "") + this.unit;
    }
}

export class DurationOffsetPart implements IPart {
    constructor(public sign: number, public duration: Duration) {
    }

    apply(origin: DateTime): DateTime {
        return this.sign > 0 ? origin.plus(this.duration) : this.sign < 0 ? origin.minus(this.duration) : origin;
    }

    toRuleString(prefixWithSeparator: boolean) {
        return (prefixWithSeparator ? this.sign ? "+" : "-" : "") + this.duration.toISO();
    }
}