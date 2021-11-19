import { DateTime, Duration } from "luxon";

import { SettleRuleBuilder } from './settle-rule-builder';
import { IPart } from "./parts/part";
import { SettleUnit } from "./settle-unit";

const firstRegex    = /^([_~^+-])?([a-zA-Z0-9]+)(.*)/;
const remainingRegex = /^([_~^+-])([a-zA-Z0-9]+)(.*)/;

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
                    builder.startOf(<SettleUnit>value);
                    break;
                case "~":
                    builder.nearest(<SettleUnit>value);
                    break;
                case "^":
                    builder.endOf(<SettleUnit>value);
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