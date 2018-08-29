import { DateTime } from "luxon";
export declare type StartOfUnit = "second" | "minute" | "hour" | "day" | "month" | "quarter" | "year" | "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday" | "january" | "february" | "march" | "april" | "may" | "june" | "july" | "august" | "september" | "october" | "november" | "december" | "season" | "spring" | "summer" | "autumn" | "winter";
export declare function startOf(origin: DateTime, unit: StartOfUnit): DateTime;
