
import Order from "../entity/order";
import OrderItem from '../entity/orderItem';
import {v4 as uuid} from 'uuid';
import { Customer } from "../../customer/entity/customer";

export default class OrderService{
 
    static calculateTotal(orders: Order[]) {
        let total: number = 0;
        for (let order of orders) {
            total += order.total();
        }
        return total;
    }

    static placeOrder(customer: Customer, items: OrderItem[]) {
        if(items.length === 0) {
            throw new Error("Items quantity must be greater than 0");
        }

        const order = new Order(uuid(), customer.id, items);
        customer.addRewardPoints(order.total() / 2);
        return order;
    }
}