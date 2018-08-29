import { SettleRuleBuilder } from './settle-rule-builder';
import { expect } from "chai";

describe("builder", () => {
    it("should return empty rule by default", () => {
        const builder = new SettleRuleBuilder();
        
        expect(builder.rule.valueOf()).to.eq("");
    });
});