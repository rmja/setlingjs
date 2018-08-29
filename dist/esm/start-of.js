export function startOf(origin, unit) {
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
            return startofWeekday(1);
        case "tuesday":
            return startofWeekday(2);
        case "wednesday":
            return startofWeekday(3);
        case "thursday":
            return startofWeekday(4);
        case "friday":
            return startofWeekday(5);
        case "saturday":
            return startofWeekday(6);
        case "sunday":
            return startofWeekday(7);
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
            return origin.startOf("quarter").minus({ months: 1 });
        case "spring":
            return startOfMonth(3);
        case "summer":
            return startOfMonth(6);
        case "autumn":
            return startOfMonth(9);
        case "winter":
            return startOfMonth(12);
    }
    function startofWeekday(weekday) {
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
//# sourceMappingURL=start-of.js.map