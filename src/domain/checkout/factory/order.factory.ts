import Order from "../entity/order";
import OrderItem from "../entity/orderItem";

interface OrderFactoryProps {
    id: string;
    customerId: string,
    items: {
        id: string;
        name: string;
        price: number;
        quantity: number;
        productId: string;

    }[]
}
export default class OrderFactory {

    static create(props: OrderFactoryProps): Order {
        const items = props.items.map(item => new OrderItem(item.id, item.name, item.price, item.productId,item.quantity));
        const order = new Order(props.id, props.customerId, items);
        return order;
    }
}