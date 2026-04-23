import {
	createDrink,
	prepareDrink,
	processPayment,
	orderDrink,
} from "../coffeshop/createDrink";
import { describe, expect, it } from "vitest";

describe("CreateDrink", () => {
	it("test createDrink Cappuccino", () => {
		expect(createDrink("Cappuccino")).toStrictEqual({
			name: "Cappuccino",
			price: "3",
		});
	});
	it("test createDrink Latte", () => {
		expect(createDrink("Latte")).toStrictEqual({
			name: "Latte",
			price: "4",
		});
	});
	it("test createDrink Americano", () => {
		expect(createDrink("Americano")).toStrictEqual({
			name: "Americano",
			price: "2",
		});
	});
	it("test createDrink Mocha", () => {
		expect(createDrink("Mocha")).toStrictEqual({
			name: "Mocha",
			price: "5",
		});
	});

	// make it fail and fix function to return "Lat - 0"
	it("#test createDrink to fail add Lat", () => {
		expect(createDrink("Lat")).toStrictEqual({
			name: "Lat",
			price: "sold out",
		});
	});
	it("#test createDrink to fail add Mjölk", () => {
		expect(createDrink("Mjölk")).toStrictEqual({
			name: "Mjölk",
			price: "sold out",
		});
	});
});

describe("PrepareDrink ticket number", () => {
	it("test prepareDrink Cappuccino", () => {
		expect(prepareDrink("Cappuccino")).toBeTypeOf("number");
	});
	it("test prepareDrink Latte", () => {
		expect(prepareDrink("Latte")).toBeLessThan(1000);
	});
	it("test prepareDrink Americano", () => {
		expect(prepareDrink("Americano")).toBeGreaterThan(-1);
	});
});

describe("ProcessPayment", () => {
	it("** test processPayment", () => {
		expect(processPayment(1, 2)).toBe(true);
	});
	it("** test processPayment fail", () => {
		expect(() => processPayment(1000, 2)).toThrowError(
			"Invalid ticket number",
		);
	});
});

describe("OrderDrink", () => {
	it("test orderDrink", () => {
		expect(() => orderDrink("Cappuccino")).not.toThrowError();
	});
	it("test orderDrink return true", () => {
		expect(orderDrink("Latte")).toBe(true);
	});
});
