import sum from "../sum.ts";
import { it, describe, expect } from "vitest";

describe("Sum value from list.", () => {
	it("test sum 0.", () => {
		expect(sum()).toBe(0);
	});
	it("test list 1,2,3,4=10", () => {
		expect(sum(1, 2, 3, 4)).toBe(10);
	});
	it("test singel number", () => {
		expect(sum(4)).toBe(4);
	});
});
