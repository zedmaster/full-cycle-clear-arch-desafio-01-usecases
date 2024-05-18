
import { Customer } from "../../customer/entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/orderItem";
import OrderService from "./order.service";

describe("Order unit tests", () => {

    it("should return the total of a list of orders", () => {
        const itemOrder1 = new OrderItem("1", "item 1", 10, "1", 2);
        const itemOrder2 = new OrderItem("2", "item 2", 20, "1", 3);

        const order = new Order("1", "1", [itemOrder1, itemOrder2]);

        const itemOrder3 = new OrderItem("3", "item 3", 30, "1", 4);
        const itemOrder4 = new OrderItem("4", "item 4", 40, "1", 5);

        const order2 = new Order("2", "1", [itemOrder3, itemOrder4]);

        const total = OrderService.calculateTotal([order, order2]);

        expect(total).toBe(400);
    })

    it("should place an order", () => {

        const customer = new Customer("1", "Luan Silas");
        const itemOrder1 = new OrderItem("1", "item 1", 10, "1", 2);
        
        const order = OrderService.placeOrder(customer, [itemOrder1]);

        expect(customer.rewardPoints).toBe(10);
        expect(order.total()).toBe(20);

    })
});