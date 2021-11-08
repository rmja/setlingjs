import { DurationOffsetPart, SettleRule, StartOfPart } from './settle-rule';
import { Duration } from 'luxon';
var SettleRuleBuilder = /** @class */ (function () {
    function SettleRuleBuilder() {
        this._rule = new SettleRule();
    }
    Object.defineProperty(SettleRuleBuilder.prototype, "rule", {
        get: function () {
            return this._rule;
        },
        enumerable: false,
        configurable: true
    });
    SettleRuleBuilder.prototype.startOf = function (unit) {
        this.rule.parts.push(new StartOfPart(unit));
        return this;
    };
    SettleRuleBuilder.prototype.plus = function (duration) {
        var value = typeof duration === "string" ? Duration.fromISO(duration) : duration;
        this.rule.parts.push(new DurationOffsetPart(1, value));
        return this;
    };
    SettleRuleBuilder.prototype.minus = function (duration) {
        var value = typeof duration === "string" ? Duration.fromISO(duration) : duration;
        this.rule.parts.push(new DurationOffsetPart(-1, value));
        return this;
    };
    return SettleRuleBuilder;
}());
export { SettleRuleBuilder };
//# sourceMappingURL=settle-rule-builder.js.map