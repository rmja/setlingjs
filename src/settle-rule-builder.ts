import { SettleRule } from "./settle-rule";

import { Duration } from "luxon";
import { NearestPart } from "./parts/nearest-part";
import { StartOfPart } from "./parts/start-of-part";
import { OffsetPart } from "./parts/offset-part";
import { SettleUnit } from "./settle-unit";
import { EndOfPart } from "./parts/end-of-part";

export class SettleRuleBuilder {
  private _rule = new SettleRule();

  get rule() {
    return this._rule;
  }

  startOf(unit: SettleUnit) {
    this.rule.parts.push(new StartOfPart(unit));
    return this;
  }

  nearest(unit: SettleUnit) {
    this.rule.parts.push(new NearestPart(unit));
    return this;
  }

  endOf(unit: SettleUnit) {
    this.rule.parts.push(new EndOfPart(unit));
    return this;
  }

  plus(duration: Duration | string) {
    const value =
      typeof duration === "string" ? Duration.fromISO(duration) : duration;
    this.rule.parts.push(new OffsetPart(1, value));
    return this;
  }

  minus(duration: Duration | string) {
    const value =
      typeof duration === "string" ? Duration.fromISO(duration) : duration;
    this.rule.parts.push(new OffsetPart(-1, value));
    return this;
  }
}
