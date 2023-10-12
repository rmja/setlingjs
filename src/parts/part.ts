import { DateTime } from "luxon";
import { EndOfPart } from "./end-of-part";
import { NearestPart } from "./nearest-part";
import { OffsetPart } from "./offset-part";
import { StartOfPart } from "./start-of-part";

export interface IPart {
    apply(origin: DateTime): DateTime;
    toRuleString(forcePrefixWithSeparator: boolean): string;
}

export type Part = NearestPart | StartOfPart | EndOfPart | OffsetPart;