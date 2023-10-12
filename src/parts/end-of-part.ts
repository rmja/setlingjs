import { DateTime } from "luxon";
import { IPart } from "./part";
import { LOCALE } from "../locale";
import { SettleUnit } from "../settle-unit";
import { endOf } from "../end-of";

export class EndOfPart implements IPart {
  constructor(public unit: SettleUnit) {}

  apply(origin: DateTime): DateTime {
    return endOf(origin, this.unit);
  }

  toRuleString(forcePrefixWithSeparator: boolean) {
    return `^${this.unit}`;
  }

  toHuman(): string {
    const rule = this.toRuleString(true);
    return LOCALE[rule];
  }
}
