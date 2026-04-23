interface DrinkType {
	name: string;
	price: string;
}

const drinks: DrinkType[] = [
	{ name: "Cappuccino", price: "3" },
	{ name: "Latte", price: "4" },
	{ name: "Americano", price: "2" },
	{ name: "Mocha", price: "6" },
];

// return drink type and price
export function createDrink(type: string): DrinkType {
	const drink: DrinkType = drinks.find((drink) => drink.name === type);
	if (!drink) return { name: type, price: "sold out" };
	return drink;
}

export function prepareDrink(drink: string): number {
	console.log(`Preparing your ${drink}`);
	const ticket: number = Math.floor(Math.random() * 999);
	return ticket;
}

export function processPayment(ticket: number, amount: number): boolean {
	if (amount <= 0) return false;
	if (ticket <= 0 || ticket > 999) throw new Error("Invalid ticket number");
	console.log(`Processing payment for ticket ${ticket} for ${amount}`);
	return true;
}

export function orderDrink(drink: string): boolean {
	// combine all functions
	const drinkType = createDrink(drink);
	const ticket = prepareDrink(drinkType.name);
	processPayment(ticket, Number(drinkType.price));

	console.log(
		`Serving your ${drink} on ticket ${ticket} pric ${drinkType.price}`,
	);
	return true;
}
