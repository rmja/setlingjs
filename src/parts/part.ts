import { DateTime } from "luxon";

export interface IPart {
    apply(origin: DateTime): DateTime;
    toRuleString(forcePrefixWithSeparator: boolean): string;
}