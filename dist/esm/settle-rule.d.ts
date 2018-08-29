import { DateTime, Duration } from "luxon";
import { StartOfUnit } from './start-of';
export declare class SettleRule {
    parts: IPart[];
    static parse(input: string): SettleRule;
    settle(origin: DateTime): DateTime;
    valueOf(): string;
}
export interface IPart {
    apply(origin: DateTime): DateTime;
}
export declare class StartOfPart implements IPart {
    unit: StartOfUnit;
    constructor(unit: StartOfUnit);
    apply(origin: DateTime): DateTime;
}
export declare class DurationOffsetPart implements IPart {
    sign: number;
    duration: Duration;
    constructor(sign: number, duration: Duration);
    apply(origin: DateTime): DateTime;
}
