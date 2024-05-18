import Order from "./order";
import OrderItem from "./orderItem";

describe("Order unit tests", () => {


    it("should throw an error when id is undefined", () => {
        expect(() => new Order("", "123", [])).toThrowError("Id is required");
    })

    it("should throw an error when customerId is undefined", () => {
        expect(() => new Order("123", "", [])).toThrowError("CustomerId is required");
    })

    it("should throw an error when items is empty", () => {
        expect(() => new Order("123", "321", [])).toThrowError("Items quantity must be greater than 0");
    })


    it("should calculate total", () => {
        const item1 = new OrderItem("1", "item 1", 10, "1", 2);
        const order = new Order("1", "1", [item1]);
        const total = order.total();

        expect(total).toBe(20);

        const item2 = new OrderItem("2", "item 2", 20, "p2", 3);
        const order2 = new Order("2", "1", [item1, item2]);

        expect(order2.total()).toBe(80);
    })


    it("should throw error if the item qty is greater than zero", () => {
        expect(()=> {

            const item1 = new OrderItem("1", "item 1", 10, "1", 0);
            const order = new Order("1", "1", [item1]);
        }).toThrowError("Quantity must be greater than 0");
       
    })

})