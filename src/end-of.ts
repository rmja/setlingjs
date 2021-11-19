import { DateTime } from "luxon";
import { SettleUnit } from "./settle-unit";
import { startOf } from "./start-of";

export function endOf(origin: DateTime, unit: SettleUnit) {
    const start = startOf(origin, unit);
    switch (unit) {
        case "second": return start.plus({seconds: 1});
        case "minute": return start.plus({minutes: 1});
        case "hour": return start.plus({hours: 1});
        case "day": return start.plus({days: 1});
        case "month": return start.plus({months: 1});
        case "quarter": return start.plus({quarters: 1});
        case "year": return start.plus({years: 1});
        case "monday":
        case "tuesday":
        case "wednesday":
        case "thursday":
        case "friday":
        case "saturday":
        case "sunday": return start.plus({days: 7});
        case "january":
        case "february":
        case "march":
        case "april":
        case "may":
        case "june":
        case "july":
        case "august":
        case "september":
        case "october":
        case "november":
        case "december": return start.plus({years: 1});
        case "season": return start.plus({months: 3});
        case "spring":
        case "summer":
        case "autumn":
        case "winter": return start.plus({years: 1});
    }
}