export const createPizza = (type) => {
  const menu = {
    margherita: 100,
    pepperoni: 120,
  };
  return { type: type, price: menu[type] };
};

const sendOrder = (pizza) => {
  console.log(`Sending ${pizza.type} to the kitchen!`);
  const orderId = Math.floor(Math.random() * 1000);
  return orderId;
};

const chargeCustomer = (orderId, amount) => {
  if (!orderId) {
    throw new Error("Cannot charge the cutomer without a valid order ID!");
  }
  console.log(`Charging ${amount}SEK for order #${orderId}`);
  return true;
};

const orderPizza = (pizzaType) => {
  const pizza = createPizza(pizzaType);
  const orderId = sendOrder(pizza);
  const paymentSuccess = chargeCustomer(orderId, pizza.price);
  return paymentSuccess;
};

export { sendOrder, orderPizza };
