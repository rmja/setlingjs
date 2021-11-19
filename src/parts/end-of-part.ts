import { DateTime } from "luxon";
import { endOf } from "../end-of";
import { SettleUnit } from "../settle-unit";
import { IPart } from "./part";

export class EndOfPart implements IPart {
    constructor(public unit: SettleUnit) {
    }

    apply(origin: DateTime): DateTime {
        return endOf(origin, this.unit);
    }

    toRuleString(forcePrefixWithSeparator: boolean) {
        return `^${this.unit}`;
    }
}