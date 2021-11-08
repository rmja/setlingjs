"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettleRuleBuilder = void 0;
var settle_rule_1 = require("./settle-rule");
var luxon_1 = require("luxon");
var SettleRuleBuilder = /** @class */ (function () {
    function SettleRuleBuilder() {
        this._rule = new settle_rule_1.SettleRule();
    }
    Object.defineProperty(SettleRuleBuilder.prototype, "rule", {
        get: function () {
            return this._rule;
        },
        enumerable: false,
        configurable: true
    });
    SettleRuleBuilder.prototype.startOf = function (unit) {
        this.rule.parts.push(new settle_rule_1.StartOfPart(unit));
        return this;
    };
    SettleRuleBuilder.prototype.plus = function (duration) {
        var value = typeof duration === "string" ? luxon_1.Duration.fromISO(duration) : duration;
        this.rule.parts.push(new settle_rule_1.DurationOffsetPart(1, value));
        return this;
    };
    SettleRuleBuilder.prototype.minus = function (duration) {
        var value = typeof duration === "string" ? luxon_1.Duration.fromISO(duration) : duration;
        this.rule.parts.push(new settle_rule_1.DurationOffsetPart(-1, value));
        return this;
    };
    return SettleRuleBuilder;
}());
exports.SettleRuleBuilder = SettleRuleBuilder;
//# sourceMappingURL=settle-rule-builder.js.map