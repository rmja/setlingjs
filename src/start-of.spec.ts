import { DateTime } from 'luxon';
import { expect } from 'chai';
import { startOf } from "./start-of";

describe("startOf", () => {
    it("should return start of day", () => {
        const origin = DateTime.fromObject({ year: 2014, month: 11, day: 12, hour: 21 });
        const result = startOf(origin, "day");

        expect(result.valueOf()).to.eq(DateTime.fromObject({ year: 2014, month: 11, day: 12 }).valueOf());
    });

    it("should return start of weekday before", () => {
        const origin = DateTime.fromObject({ year: 2014, month: 11, day: 12, hour: 21 }); // wednesday
        const result = startOf(origin, "monday");

        expect(result.valueOf()).to.eq(DateTime.fromObject({ year: 2014, month: 11, day: 10 }).valueOf());
    });

    it("should return start of weekday same", () => {
        const origin = DateTime.fromObject({ year: 2014, month: 11, day: 12, hour: 21 }); // wednesday
        const result = startOf(origin, "wednesday");

        expect(result.valueOf()).to.eq(DateTime.fromObject({ year: 2014, month: 11, day: 12 }).valueOf());
    });

    it("should return start of weekday after", () => {
        const origin = DateTime.fromObject({ year: 2014, month: 11, day: 12, hour: 21 }); // wednesday
        const result = startOf(origin, "friday");

        expect(result.valueOf()).to.eq(DateTime.fromObject({ year: 2014, month: 11, day: 7 }).valueOf());
    });

    it("should return start of month before", () => {
        const origin = DateTime.fromObject({ year: 2014, month: 11, day: 12, hour: 21 });
        const result = startOf(origin, "april");

        expect(result.valueOf()).to.eq(DateTime.fromObject({ year: 2014, month: 4, day: 1 }).valueOf());
    });

    it("should return start of month same", () => {
        const origin = DateTime.fromObject({ year: 2014, month: 11, day: 12, hour: 21 });
        const result = startOf(origin, "november");

        expect(result.valueOf()).to.eq(DateTime.fromObject({ year: 2014, month: 11, day: 1 }).valueOf());
    });

    it("should return start of month after", () => {
        const origin = DateTime.fromObject({ year: 2014, month: 11, day: 12, hour: 21 });
        const result = startOf(origin, "december");

        expect(result.valueOf()).to.eq(DateTime.fromObject({ year: 2013, month: 12, day: 1 }).valueOf());
    });

    it("should return start of season", () => {
        const origin = DateTime.fromObject({ year: 2014, month: 11, day: 12, hour: 21 });
        const result = startOf(origin, "season");

        expect(result.valueOf()).to.eq(DateTime.fromObject({ year: 2014, month: 9, day: 1 }).valueOf());
    });

    it("should return start of season before", () => {
        const origin = DateTime.fromObject({ year: 2014, month: 11, day: 12, hour: 21 });
        const result = startOf(origin, "summer");

        expect(result.valueOf()).to.eq(DateTime.fromObject({ year: 2014, month: 6, day: 1 }).valueOf());
    });

    it("should return start of season same", () => {
        const origin = DateTime.fromObject({ year: 2014, month: 11, day: 12, hour: 21 });
        const result = startOf(origin, "autumn");

        expect(result.valueOf()).to.eq(DateTime.fromObject({ year: 2014, month: 9, day: 1 }).valueOf());
    });

    it("should return start of season after", () => {
        const origin = DateTime.fromObject({ year: 2014, month: 11, day: 12, hour: 21 });
        const result = startOf(origin, "winter");

        expect(result.valueOf()).to.eq(DateTime.fromObject({ year: 2013, month: 12, day: 1 }).valueOf());
    });
});