import { SettleRule } from './settle-rule';
import { Duration } from 'luxon';
import { StartOfUnit } from "./start-of";
export declare class SettleRuleBuilder {
    _rule: SettleRule;
    readonly rule: SettleRule;
    startOf(unit: StartOfUnit): this;
    plus(duration: Duration | string): this;
    minus(duration: Duration | string): this;
}
