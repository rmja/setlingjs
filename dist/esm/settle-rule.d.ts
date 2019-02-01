import { DateTime, Duration } from "luxon";
import { StartOfUnit } from './start-of';
export declare class SettleRule {
    parts: IPart[];
    static parse(input: string): SettleRule;
    settle(origin: DateTime): DateTime;
    valueOf(): string;
    toString(): string;
}
export interface IPart {
    apply(origin: DateTime): DateTime;
    toRuleString(forcePrefixWithSeparator: boolean): string;
}
export declare class StartOfPart implements IPart {
    unit: StartOfUnit;
    constructor(unit: StartOfUnit);
    apply(origin: DateTime): DateTime;
    toRuleString(forcePrefixWithSeparator: boolean): string;
}
export declare class DurationOffsetPart implements IPart {
    sign: -1 | 1;
    duration: Duration;
    constructor(sign: -1 | 1, duration: Duration);
    apply(origin: DateTime): DateTime;
    toRuleString(forcePrefixWithSeparator: boolean): string;
}
