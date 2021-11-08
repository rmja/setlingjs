import { SettleRule } from './settle-rule';
import { Duration } from 'luxon';
import { StartOfUnit } from "./start-of";
export declare class SettleRuleBuilder {
    private _rule;
    get rule(): SettleRule;
    startOf(unit: StartOfUnit): this;
    plus(duration: Duration | string): this;
    minus(duration: Duration | string): this;
}
