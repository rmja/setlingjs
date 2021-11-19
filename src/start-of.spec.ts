import * as cases from 'cases';

import { startOf } from "./start-of";

import { DateTime } from 'luxon';
import { expect } from 'chai';
import { SettleUnit } from './settle-unit';

describe("startOf", () => {
    it("should return start of day", () => {
        const origin = DateTime.fromObject({ year: 2014, month: 11, day: 12, hour: 21 });
        const result = startOf(origin, "day");

        expect(result.valueOf()).to.eq(DateTime.fromObject({ year: 2014, month: 11, day: 12 }).valueOf());
    });

    it("should return start of weekday", () => cases<SettleUnit, number>([
        ["monday", 10],
        ["tuesday", 11],
        ["wednesday", 12],
        ["thursday", 6],
        ["friday", 7],
        ["saturday", 8],
        ["sunday", 9],
    ], (weekday, expectedDay) => {
        const origin = DateTime.fromObject({ year: 2014, month: 11, day: 12, hour: 21 }); // Wednesday
        const result = startOf(origin, weekday);

        expect(result.valueOf()).to.eq(DateTime.fromObject({ year: 2014, month: 11, day: expectedDay }).valueOf());
    }));

    it("should return start of month", () => cases<SettleUnit, number, number>([
        ["january", 2014, 1],
        ["february", 2014, 2],
        ["march", 2014, 3],
        ["april", 2014, 4],
        ["may", 2014, 5],
        ["june", 2014, 6],
        ["july", 2014, 7],
        ["august", 2014, 8],
        ["september", 2014, 9],
        ["october", 2014, 10],
        ["november", 2014, 11],
        ["december", 2013, 12],
    ], (month, expectedYear, expectedMonth) => {
        const origin = DateTime.fromObject({ year: 2014, month: 11, day: 12, hour: 21 });
        const result = startOf(origin, month);

        expect(result.valueOf()).to.eq(DateTime.fromObject({ year: expectedYear, month: expectedMonth, day: 1 }).valueOf());
    }));

    it("should return start of season", () => cases([
        [1, 2013, 12],
        [1, 2013, 12],
        [1, 2014, 3],
        [1, 2014, 3],
        [1, 2014, 3],
        [1, 2014, 6],
        [1, 2014, 6],
        [1, 2014, 6],
        [1, 2014, 9],
        [1, 2014, 9],
        [1, 2014, 9],
        [1, 2014, 12]
    ], (month, expectedYear, expectedMonth) => {
        const origin = DateTime.fromObject({ year: 2014, month: month, day: 12, hour: 21 });
        const result = startOf(origin, "season");

        expect(result.valueOf()).to.eq(DateTime.fromObject({ year: expectedYear, month: expectedMonth, day: 1 }).valueOf());
    }));
});