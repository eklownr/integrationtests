# Integration Testing, Student Exercises

> **Tutorial video:** [Integration Testing with the Pizza Shop](https://www.youtube.com/watch?v=Ydlo-f1Mdl4)

## What is Integration Testing?

When you write a **unit test**, you test a single function in isolation. You check that `createPizza("margherita")` returns `{ type: "margherita", price: 100 }`, nothing more, nothing less.

When you write an **integration test**, you test how multiple units work _together_. The pizza shop example from the lesson demonstrates this: `orderPizza` internally calls `createPizza`, then `sendOrder`, then `chargeCustomer`. The integration test doesn't care about each step individually, it verifies that the whole chain produces the right outcome.

**Why does this matter?** Each unit can pass its own tests, yet still break when combined. Integration tests catch the gaps.

---

## Jest vs Vitest, Which Should You Use?

Both Jest and Vitest are excellent testing frameworks with nearly identical APIs. Here's how to choose:

|               | **Jest**                                                     | **Vitest**                                            |
| ------------- | ------------------------------------------------------------ | ----------------------------------------------------- |
| Best for      | Node.js projects, React (Create React App), legacy codebases | Vite-based projects (Vue, React with Vite, SvelteKit) |
| Config needed | Minimal for Node; some setup for ESM                         | Near-zero if you already use Vite                     |
| Speed         | Fast                                                         | Faster (runs in Vite's dev server)                    |
| ESM support   | Requires extra config                                        | Native                                                |
| Maturity      | Very mature, huge ecosystem                                  | Newer but production-ready                            |

**Rule of thumb:** If your project uses Vite, use Vitest. Otherwise, use Jest.

In the tutorial examples, **Jest** is used. The syntax (`describe`, `test`, `expect`, `.toBe`, `.toEqual`) is identical in both frameworks, so the exercises below work with either one.

### Running your tests

```bash
# Jest
npx jest

# Vitest
npx vitest run
```

---

## The Tutorial Code (for reference)

The lesson walked through a `pizzashop.js` module with three internal steps:

1. **`createPizza(type)`**, looks up the price from a menu and returns a pizza object
2. **`sendOrder(pizza)`**, simulates sending the order to a kitchen, returns a random order ID
3. **`chargeCustomer(orderId, amount)`**, charges the customer, throws if the order ID is missing

These are composed by **`orderPizza(pizzaType)`**, which is the integration point, and the subject of the integration test.

---

## Recommended Folder Structure

There are two common approaches to organising test files.

**Co-located tests** place each test file right next to the source file it tests:

```
src/
  pizzashop.js
  pizzashop.test.js
  payment.js
  payment.test.js
```

This is popular in React and frontend projects. The advantage is that tests are easy to find and it is obvious when a source file is missing a test.

**Dedicated `__tests__` folder** mirrors your source structure in a separate folder:

```
src/
  pizzashop.js
  payment.js
__tests__/
  unit/
    pizzashop.test.js
    payment.test.js
  integration/
    order.test.js
```

This is common in Node.js and backend projects. It keeps source code clean and makes it easy to run only unit or only integration tests.

For these exercises, use the `__tests__/unit/` and `__tests__/integration/` structure, as it makes the distinction between the two test types visually clear.

A couple of other conventions worth knowing: test files should match the name of the file they test (`pizzashop.test.js` for `pizzashop.js`), and some teams use a `.spec.js` suffix instead of `.test.js`. Both are widely accepted and picked up automatically by Jest and Vitest.

---

## Exercises

### Exercise 1, The Coffee Shop

You run a coffee shop. Model it with the following three functions:

**`createDrink(type)`**

- Accepts `"latte"`, `"espresso"`, or `"cappuccino"`
- Returns an object `{ type, price }` using this menu:
  - latte: 45
  - espresso: 30
  - cappuccino: 50

**`prepareOrder(drink)`**

- Logs `"Preparing <type>..."`
- Returns a randomly generated ticket number (integer between 0–999)

**`processPayment(ticketNumber, amount)`**

- Throws `"No ticket number provided"` if `ticketNumber` is falsy
- Logs `"Payment of <amount> received for ticket #<ticketNumber>"`
- Returns `true`

**`orderDrink(drinkType)`** composes the three above, just like `orderPizza` did.

#### Your tasks

Write **unit tests** for:

- `createDrink` with a known type (check both `type` and `price`)
- `createDrink` with an unknown type (what do you expect `price` to be?)
- `prepareOrder` (what can you assert about the ticket number it returns?)

Write an **integration test** for:

- `orderDrink("latte")`, does the full flow return `true`?

> Think about what makes the integration test different from the `orderPizza` unit test in the tutorial. They look similar, but what is actually being verified in each case?

---

### Exercise 2, The Bookstore

You manage an online bookstore checkout. Model it with the following:

**`findBook(title)`**

- Accepts `"dune"`, `"neuromancer"`, or `"foundation"`
- Returns `{ title, price }` using this catalogue:
  - dune: 89
  - neuromancer: 79
  - foundation: 75

**`reserveStock(book)`**

- Logs `"Reserving stock for <title>"`
- Returns a reservation code, a random integer between 1000–9999 (inclusive)

**`confirmPurchase(reservationCode, price)`**

- Throws `"Invalid reservation"` if `reservationCode` is falsy
- Logs `"Purchase confirmed. Reservation: <code>, Amount: <price>"`
- Returns `{ success: true, code: reservationCode }`

**`buyBook(title)`** composes the three above.

#### Your tasks

Write **unit tests** for:

- `findBook` with a valid title
- `findBook` with a title not in the catalogue
- `reserveStock`, what properties of the return value can you assert?
- `confirmPurchase`, does it throw when called with a falsy reservation code?

Write an **integration test** for:

- `buyBook("dune")`, does the result have `success: true`?

> Notice that `confirmPurchase` returns an object, not just `true`. How does your integration test assertion change compared to Exercise 1? Consider using `.toEqual` vs `.toBe`, and why it matters here.

---

## Hints

- A function that uses `Math.random()` is non-deterministic. You can't assert the _exact_ return value, but you _can_ assert its _type_ and _range_, just like the `sendOrder` unit test did in the tutorial.
- If a function is supposed to throw, use `expect(() => fn()).toThrow("message")`.
- Integration tests call the top-level composed function and assert on the final output. You are _not_ mocking the inner functions, that's the point.
# integrationtests
