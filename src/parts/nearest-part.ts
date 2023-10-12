import { DateTime } from "luxon";
import { IPart } from "./part";
import { LOCALE } from "../locale";
import { SettleUnit } from "../settle-unit";
import { endOf } from "../end-of";
import { startOf } from "../start-of";

export class NearestPart implements IPart {
  constructor(public unit: SettleUnit) {}

  apply(origin: DateTime): DateTime {
    const start = startOf(origin, this.unit);
    const end = endOf(origin, this.unit);
    if (origin.diff(start) <= end.diff(origin)) {
      return start;
    } else {
      return end;
    }
  }

  toRuleString(forcePrefixWithSeparator: boolean): string {
    return `~${this.unit}`;
  }

  toHuman(): string {
    const rule = this.toRuleString(true);
    return LOCALE[rule];
  }
}
