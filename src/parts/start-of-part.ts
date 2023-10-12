import { DateTime } from "luxon";
import { IPart } from "./part";
import { LOCALE } from "../locale";
import { SettleUnit } from "../settle-unit";
import { startOf } from "../start-of";

export class StartOfPart implements IPart {
  constructor(public unit: SettleUnit) {}

  apply(origin: DateTime): DateTime {
    return startOf(origin, this.unit);
  }

  toRuleString(forcePrefixWithSeparator: boolean) {
    return (forcePrefixWithSeparator ? "_" : "") + this.unit;
  }

  toHuman(): string {
    const rule = this.toRuleString(true);
    return LOCALE[rule];
  }
}
