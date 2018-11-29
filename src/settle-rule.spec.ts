import * as cases from 'cases';

import { DateTime } from 'luxon';
import { SettleRule } from "./settle-rule";
import { SettleRuleBuilder } from './settle-rule-builder';
import { expect } from "chai";

describe("parse", () => {
    it("should return an empty rule when input is empty", () => {
        const rule = SettleRule.parse("");

        expect(rule.valueOf()).to.eq("");
    });

    it("should parse startOf", () => {
        const rule = SettleRule.parse("day");

        expect(rule.valueOf()).to.eq(new SettleRuleBuilder().startOf("day").rule.valueOf());
    });

    it("should parse startOf with _", () => {
        const rule = SettleRule.parse("_day");

        expect(rule.valueOf()).to.eq(new SettleRuleBuilder().startOf("day").rule.valueOf());
    });

    it("should parse multiple startOf", () => {
        const rule = SettleRule.parse("hour_day");

        expect(rule.valueOf()).to.eq(new SettleRuleBuilder().startOf("hour").startOf("day").rule.valueOf());
    });

    it("should parse duration", () => {
        const rule = SettleRule.parse("P1D");

        expect(rule.valueOf()).to.eq(new SettleRuleBuilder().plus("P1D").rule.valueOf());
    });

    it("should parse duration with +", () => {
        const rule = SettleRule.parse("+P1D");

        expect(rule.valueOf()).to.eq(new SettleRuleBuilder().plus("P1D").rule.valueOf());
    });

    it("should parse duration with -", () => {
        const rule = SettleRule.parse("-P1D");

        expect(rule.valueOf()).to.eq(new SettleRuleBuilder().minus("P1D").rule.valueOf());
    });

    it("should parse startOf with duration", () => {
        const rule = SettleRule.parse("day+P1D");

        expect(rule.valueOf()).to.eq(new SettleRuleBuilder().startOf("day").plus("P1D").rule.valueOf());
    });

    it("should parse startOf with multiple durations", () => {
        const rule = SettleRule.parse("day+P1D-PT2H");

        expect(rule.valueOf()).to.eq(new SettleRuleBuilder().startOf("day").plus("P1D").minus("PT2H").rule.valueOf());
    });

    it("should parse multiple startOf and multiple durations", () => {
        const rule = SettleRule.parse("day+P1D-PT2H_day+P1Y");

        expect(rule.valueOf()).to.eq(new SettleRuleBuilder().startOf("day").plus("P1D").minus("PT2H").startOf("day").plus("P1Y").rule.valueOf());
    });
});

describe("settle", () => {
    it("should return same instant when no parts", () => {
        const origin = DateTime.fromObject({ year: 2014, month: 11, day: 12, hour: 9 });
        const settled = SettleRule.parse("").settle(origin);

        expect(settled.valueOf()).to.eq(origin.valueOf());
    });

    it("should apply parts", () => {
        const origin = DateTime.fromObject({ year: 2014, month: 11, day: 12, hour: 9 });
        const settled = SettleRule.parse("day+P2D-PT1H").settle(origin);

        expect(settled.valueOf()).to.eq(DateTime.fromObject({ year: 2014, month: 11, day: 13, hour: 23 }).valueOf());
    });
    
    it("should settle expected reading date", cases([
        [10, 31, 1],
        [10, 31, 14],
        [10, 31, 15],
        [11, 30, 16],
        [11, 30, 30]
    ], (expectedMonth, expectedDay, day) => {
        const origin = DateTime.fromObject({ year: 2014, month: 11, day: day, hour: 9 });
        const settled = SettleRule.parse("-P15D_month+P1M-P1D").settle(origin);

        expect(settled.valueOf()).to.eq(DateTime.fromObject({ year: 2014, month: expectedMonth, day: expectedDay }).valueOf());
    }));
})