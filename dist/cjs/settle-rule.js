"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var luxon_1 = require("luxon");
var start_of_1 = require("./start-of");
var settle_rule_builder_1 = require("./settle-rule-builder");
var firstRegex = /^([_+-])?([a-zA-Z0-9]+)(.*)/;
var remainingRegex = /^([_+-])([a-zA-Z0-9]+)(.*)/;
var SettleRule = /** @class */ (function () {
    function SettleRule() {
        this.parts = [];
    }
    SettleRule.parse = function (input) {
        var builder = new settle_rule_builder_1.SettleRuleBuilder();
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
                    builder.plus(luxon_1.Duration.fromISO(value));
                    break;
                case "-":
                    builder.minus(luxon_1.Duration.fromISO(value));
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
        var string = "";
        for (var _i = 0, _a = this.parts; _i < _a.length; _i++) {
            var part = _a[_i];
            if (part instanceof StartOfPart) {
                string += string.length > 0 ? "_" + part.unit : part.unit;
            }
            else if (part instanceof DurationOffsetPart) {
                string += string.length > 0 ? (part.sign > 0 ? "+" : "-") + part.duration.toISO() : part.duration.toISO();
            }
        }
        return string;
    };
    return SettleRule;
}());
exports.SettleRule = SettleRule;
var StartOfPart = /** @class */ (function () {
    function StartOfPart(unit) {
        this.unit = unit;
    }
    StartOfPart.prototype.apply = function (origin) {
        return start_of_1.startOf(origin, this.unit);
    };
    return StartOfPart;
}());
exports.StartOfPart = StartOfPart;
var DurationOffsetPart = /** @class */ (function () {
    function DurationOffsetPart(sign, duration) {
        this.sign = sign;
        this.duration = duration;
    }
    DurationOffsetPart.prototype.apply = function (origin) {
        return this.sign > 0 ? origin.plus(this.duration) : this.sign < 0 ? origin.minus(this.duration) : origin;
    };
    return DurationOffsetPart;
}());
exports.DurationOffsetPart = DurationOffsetPart;
//# sourceMappingURL=settle-rule.js.map