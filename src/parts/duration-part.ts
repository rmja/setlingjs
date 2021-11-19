import { DateTime, Duration } from "luxon";
import { IPart } from "./part";

export class DurationPart implements IPart {
    constructor(public sign: -1 | 1, public duration: Duration) {
    }

    apply(origin: DateTime): DateTime {
        return this.sign > 0
            ? origin.plus(this.duration)
            : this.sign < 0
                ? origin.minus(this.duration)
                : origin;
    }

    toRuleString(forcePrefixWithSeparator: boolean) {
        return (this.sign === -1 ? "-" : forcePrefixWithSeparator ? "+" : "") + this.duration.toISO();
    }
}