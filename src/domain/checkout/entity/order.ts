import OrderItem from "./orderItem";

export default class Order {
    private _id: string = "";
    private _customerId: string = "";
    private _items: OrderItem[];

    constructor(id: string, customerId: string, items: OrderItem[]) {
        this._id = id;
        this._customerId = customerId;
        this._items = items;

        this.validate();
    }

    get id() {
        return this._id;
    }

    get items() {
        return this._items;
    }


    changeCustomer(customerId: string) {
        this._customerId = customerId;
    }

    addItem(item: OrderItem) {
        this._items.push(item);
    }

    get customerId() {
        return this._customerId;
    }

    validate() : boolean{
        if (this._id.length === 0) {
            throw new Error("Id is required");
        }

        if (this._customerId.length === 0) {
            throw new Error("CustomerId is required");
        }

        if (this._items.length === 0) {
            throw new Error("Items quantity must be greater than 0");
        }

        return true;
      

       
    }


    total(): number {
        let total : number = 0;
        for (let item of this._items) {
            total += item.orderItemTotal;
        }
        return total;
    }
}