import { Duration } from "luxon";
import { startOf } from './start-of';
import { SettleRuleBuilder } from './settle-rule-builder';
var firstRegex = /^([_+-])?([a-zA-Z0-9]+)(.*)/;
var remainingRegex = /^([_+-])([a-zA-Z0-9]+)(.*)/;
var SettleRule = /** @class */ (function () {
    function SettleRule() {
        this.parts = [];
    }
    SettleRule.parse = function (input) {
        var builder = new SettleRuleBuilder();
        var match = input.match(firstRegex);
        if (match) {
            addPart(match[1] || (match[2][0] === "P" ? "+" : "_"), match[2]);
            var remaining = match[3];
            while ((match = remaining.match(remainingRegex)) !== null) {
                addPart(match[1], match[2]);
                remaining = match[3];
            }
        }
        return builder.rule;
        function addPart(op, value) {
            switch (op) {
                case "_":
                    builder.startOf(value);
                    break;
                case "+":
                    builder.plus(Duration.fromISO(value));
                    break;
                case "-":
                    builder.minus(Duration.fromISO(value));
                    break;
                default:
                    throw new Error();
            }
        }
    };
    SettleRule.prototype.settle = function (origin) {
        for (var _i = 0, _a = this.parts; _i < _a.length; _i++) {
            var part = _a[_i];
            origin = part.apply(origin);
        }
        return origin;
    };
    SettleRule.prototype.valueOf = function () {
        return this.toString();
    };
    SettleRule.prototype.toString = function () {
        var string = "";
        for (var _i = 0, _a = this.parts; _i < _a.length; _i++) {
            var part = _a[_i];
            string += part.toRuleString(string.length > 0);
        }
        return string;
    };
    return SettleRule;
}());
export { SettleRule };
var StartOfPart = /** @class */ (function () {
    function StartOfPart(unit) {
        this.unit = unit;
    }
    StartOfPart.prototype.apply = function (origin) {
        return startOf(origin, this.unit);
    };
    StartOfPart.prototype.toRuleString = function (forcePrefixWithSeparator) {
        return (forcePrefixWithSeparator ? "_" : "") + this.unit;
    };
    return StartOfPart;
}());
export { StartOfPart };
var DurationOffsetPart = /** @class */ (function () {
    function DurationOffsetPart(sign, duration) {
        this.sign = sign;
        this.duration = duration;
    }
    DurationOffsetPart.prototype.apply = function (origin) {
        return this.sign > 0 ? origin.plus(this.duration) : this.sign < 0 ? origin.minus(this.duration) : origin;
    };
    DurationOffsetPart.prototype.toRuleString = function (forcePrefixWithSeparator) {
        return (this.sign === -1 ? "-" : forcePrefixWithSeparator ? "+" : "") + this.duration.toISO();
    };
    return DurationOffsetPart;
}());
export { DurationOffsetPart };
//# sourceMappingURL=settle-rule.js.map