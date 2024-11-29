import { Duration } from "luxon";
import { SettleRuleBuilder } from "./settle-rule-builder";
import { expect } from "chai";

describe("builder", () => {
  it("should return empty rule by default", () => {
    const builder = new SettleRuleBuilder();

    expect(builder.rule.valueOf()).to.eq("");
  });

  it("should handle only time component", () => {
    const builder = new SettleRuleBuilder()
      .startOf("hour")
      .minus(Duration.fromObject({ hours: 1 }));

    expect(builder.rule.valueOf()).to.eq("hour-PT1H");
  });

  it("should handle positive and negative offsets", () => {
    const builder = new SettleRuleBuilder().minus("P1M").plus("P1Y");

    expect(builder.rule.valueOf()).to.eq("-P1M+P1Y");
  });

  it("should handle rounding and positive and negative offsets", () => {
    const builder = new SettleRuleBuilder()
      .startOf("month")
      .minus("P1M")
      .plus("P1Y")
      .startOf("day");

    expect(builder.rule.valueOf()).to.eq("month-P1M+P1Y_day");
  });
});
