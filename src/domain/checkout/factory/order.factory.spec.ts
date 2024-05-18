import OrderFactory from "./order.factory";

describe("Order factory unity test", () => {

    it("should create an order", () => {
        const orderProps =  {
            id: "1",
            customerId: "1",
            items: [
                {
                    id: "i1",
                    name: "Product A",
                    price: 10,
                    quantity: 1,
                    productId: "p1"
                }
            ]
        };

        const order = OrderFactory.create(orderProps);

        expect(order.id).toBe("1");
        expect(order.customerId).toBe("1");
        expect(order.items.length).toBe(1);
        expect(order.items[0].id).toBe("i1");
        expect(order.items[0].name).toBe("Product A");
        expect(order.items[0].price).toBe(10);
        expect(order.items[0].quantity).toBe(1);
        expect(order.items[0].productId).toBe("p1");

    })
})