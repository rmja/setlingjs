import { DateTime } from "luxon";
import { endOf } from "../end-of";
import { SettleUnit } from "../settle-unit";
import { startOf } from "../start-of";
import { IPart } from "./part";

export class NearestPart implements IPart {
    constructor(public unit: SettleUnit) {
    }

    apply(origin: DateTime): DateTime {
        const start = startOf(origin, this.unit);
        const end = endOf(origin, this.unit);
        if (origin.diff(start) <= end.diff(origin)) {
            return start;
        }
        else {
            return end;
        }
    }

    private getLatest(earliest: DateTime) {
        
    }

    toRuleString(forcePrefixWithSeparator: boolean): string {
        return `~${this.unit}`;
    }
}