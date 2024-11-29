import { DateTime } from "luxon";
import { SettleUnit } from "./settle-unit";
import { expect } from "chai";
import { startOf } from "./start-of";

describe("startOf", () => {
  it("should return start of day", () => {
    const origin = DateTime.fromObject({
      year: 2014,
      month: 11,
      day: 12,
      hour: 21,
    });
    const result = startOf(origin, "day");

    expect(result.valueOf()).to.eq(
      DateTime.fromObject({ year: 2014, month: 11, day: 12 }).valueOf(),
    );
  });

  it("should return start of weekday", () => {
    const test = (weekday: SettleUnit, expectedDay: number) => {
      const origin = DateTime.fromObject({
        year: 2014,
        month: 11,
        day: 12,
        hour: 21,
      }); // Wednesday
      const result = startOf(origin, weekday);

      expect(result.valueOf()).to.eq(
        DateTime.fromObject({
          year: 2014,
          month: 11,
          day: expectedDay,
        }).valueOf(),
      );
    };

    test("monday", 10);
    test("tuesday", 11);
    test("wednesday", 12);
    test("thursday", 6);
    test("friday", 7);
    test("saturday", 8);
    test("sunday", 9);
  });

  it("should return start of month", () => {
    const test = (
      month: SettleUnit,
      expectedYear: number,
      expectedMonth: number,
    ) => {
      const origin = DateTime.fromObject({
        year: 2014,
        month: 11,
        day: 12,
        hour: 21,
      });
      const result = startOf(origin, month);

      expect(result.valueOf()).to.eq(
        DateTime.fromObject({
          year: expectedYear,
          month: expectedMonth,
          day: 1,
        }).valueOf(),
      );
    };

    test("january", 2014, 1);
    test("february", 2014, 2);
    test("march", 2014, 3);
    test("april", 2014, 4);
    test("may", 2014, 5);
    test("june", 2014, 6);
    test("july", 2014, 7);
    test("august", 2014, 8);
    test("september", 2014, 9);
    test("october", 2014, 10);
    test("november", 2014, 11);
    test("december", 2013, 12);
  });

  it("should return start of season", () => {
    const test = (
      month: number,
      expectedYear: number,
      expectedMonth: number,
    ) => {
      const origin = DateTime.fromObject({
        year: 2014,
        month: month,
        day: 12,
        hour: 21,
      });
      const result = startOf(origin, "season");

      expect(result.valueOf()).to.eq(
        DateTime.fromObject({
          year: expectedYear,
          month: expectedMonth,
          day: 1,
        }).valueOf(),
      );
    };

    test(1, 2013, 12);
    test(2, 2013, 12);
    test(3, 2014, 3);
    test(4, 2014, 3);
    test(5, 2014, 3);
    test(6, 2014, 6);
    test(7, 2014, 6);
    test(8, 2014, 6);
    test(9, 2014, 9);
    test(10, 2014, 9);
    test(11, 2014, 9);
    test(12, 2014, 12);
  });
});
