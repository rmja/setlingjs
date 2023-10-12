import { DateTime, Duration } from "luxon";

import { IPart } from "./part";

export class OffsetPart implements IPart {
  sign: -1 | 1;
  
  constructor(
    sign: -1 | 1 | "+" | "-",
    public duration: Duration
  ) {
    this.sign = sign === -1 || sign == "-" ? -1 : 1;
  }

  apply(origin: DateTime): DateTime {
    return this.sign > 0
      ? origin.plus(this.duration)
      : this.sign < 0
      ? origin.minus(this.duration)
      : origin;
  }

  toRuleString(forcePrefixWithSeparator: boolean) {
    return (
      (this.sign === -1 ? "-" : forcePrefixWithSeparator ? "+" : "") +
      this.duration.toISO()
    );
  }

  toHuman(): string {
    return (this.sign === -1 ? "- " : "+ ") + this.duration.toHuman();
  }
}
