import { DateTime } from "luxon";
import { SettleUnit } from "../settle-unit";
import { startOf } from "../start-of";
import { IPart } from "./part";

export class StartOfPart implements IPart {
    constructor(public unit: SettleUnit) {
    }

    apply(origin: DateTime): DateTime {
        return startOf(origin, this.unit);
    }

    toRuleString(forcePrefixWithSeparator: boolean) {
        return (forcePrefixWithSeparator ? "_" : "") + this.unit;
    }
}