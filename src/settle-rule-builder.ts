import { DurationOffsetPart, SettleRule, StartOfPart } from './settle-rule';

import { Duration } from 'luxon';
import { StartOfUnit } from "./start-of";

export class SettleRuleBuilder {
    _rule = new SettleRule();

    get rule() {
        return this._rule;
    }

    startOf(unit: StartOfUnit) {
        this.rule.parts.push(new StartOfPart(unit));

        return this;
    }

    plus(duration: Duration | string) {
        const value = typeof duration === "string" ? Duration.fromISO(duration) : duration;
        this.rule.parts.push(new DurationOffsetPart(1, value));

        return this;
    }

    minus(duration: Duration | string) {
        const value = typeof duration === "string" ? Duration.fromISO(duration) : duration;
        this.rule.parts.push(new DurationOffsetPart(-1, value));

        return this;
    }
}