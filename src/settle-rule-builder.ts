import { Duration } from "luxon";
import { EndOfPart } from "./parts/end-of-part";
import { NearestPart } from "./parts/nearest-part";
import { OffsetPart } from "./parts/offset-part";
import { Part } from "./parts/part";
import { SettleRule } from "./settle-rule";
import { SettleUnit } from "./settle-unit";
import { StartOfPart } from "./parts/start-of-part";

export class SettleRuleBuilder {
  private _rule = new SettleRule();

  get rule() {
    return this._rule;
  }

  add(part: Part) {
    this._rule.parts.push(part);
    return this;
  }

  startOf(unit: SettleUnit) {
    this.add(new StartOfPart(unit));
    return this;
  }

  nearest(unit: SettleUnit) {
    this.add(new NearestPart(unit));
    return this;
  }

  endOf(unit: SettleUnit) {
    this.add(new EndOfPart(unit));
    return this;
  }

  plus(duration: Duration | string) {
    const value =
      typeof duration === "string" ? Duration.fromISO(duration) : duration;
    this.add(new OffsetPart(1, value));
    return this;
  }

  minus(duration: Duration | string) {
    const value =
      typeof duration === "string" ? Duration.fromISO(duration) : duration;
    this.add(new OffsetPart(-1, value));
    return this;
  }
}
