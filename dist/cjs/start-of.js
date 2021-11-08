"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startOf = void 0;
function startOf(origin, unit) {
    switch (unit) {
        case "second":
        case "minute":
        case "hour":
        case "day":
        case "month":
        case "quarter":
        case "year":
            return origin.startOf(unit);
        case "monday":
            return startOfWeekday(1);
        case "tuesday":
            return startOfWeekday(2);
        case "wednesday":
            return startOfWeekday(3);
        case "thursday":
            return startOfWeekday(4);
        case "friday":
            return startOfWeekday(5);
        case "saturday":
            return startOfWeekday(6);
        case "sunday":
            return startOfWeekday(7);
        case "january":
            return startOfMonth(1);
        case "february":
            return startOfMonth(2);
        case "march":
            return startOfMonth(3);
        case "april":
            return startOfMonth(4);
        case "may":
            return startOfMonth(5);
        case "june":
            return startOfMonth(6);
        case "july":
            return startOfMonth(7);
        case "august":
            return startOfMonth(8);
        case "september":
            return startOfMonth(9);
        case "october":
            return startOfMonth(10);
        case "november":
            return startOfMonth(11);
        case "december":
            return startOfMonth(12);
        case "season":
            // 1 -> 12
            // 2 -> 12
            // 3 -> 3
            // 4 -> 3
            // 5 -> 3
            // 6 -> 6
            // 7 -> 6
            // 8 -> 6
            // 9 -> 9
            // 10 -> 9
            // 11 -> 9
            // 12 -> 12
            var season = Math.floor((origin.month % 12) / 3);
            return season ? startOfMonth(season * 3) : startOfMonth(12);
        case "spring":
            return startOfMonth(3);
        case "summer":
            return startOfMonth(6);
        case "autumn":
            return startOfMonth(9);
        case "winter":
            return startOfMonth(12);
    }
    function startOfWeekday(weekday) {
        var startOfMonday = origin.startOf("day").minus({ days: origin.weekday - 1 }); // origin.weekday: 1 = monday, 7 = sunday
        var settled = startOfMonday.plus({ days: weekday - 1 });
        return settled <= origin ? settled : settled.minus({ days: 7 });
    }
    function startOfMonth(month) {
        var startOfYear = origin.startOf("year");
        var settled = startOfYear.plus({ months: month - 1 });
        return settled <= origin ? settled : settled.minus({ years: 1 });
    }
}
exports.startOf = startOf;
//# sourceMappingURL=start-of.js.map