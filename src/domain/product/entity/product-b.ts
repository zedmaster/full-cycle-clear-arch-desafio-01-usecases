import ProductInterface from "./product.interface";

export default class ProductB implements ProductInterface{

    private _id: string = "";
    private _name: string = "";
    private _price: number = 0;

    constructor(id: string, name: string, price: number) {
        this._id = id;
        this._name = name;
        this._price = price;

        this.validate();
    }

    validate() : boolean{
        if (this._id.length === 0) {
            throw new Error("Id is required");
        }

        if (this._name.length === 0) {
            throw new Error("Name is required");
        }

        if(this._price <= 0){
            throw new Error("Price must be greater than 0");
        }
        
        return true;
      

       
    }

    get id() {
        return this._id;
    }
    
    changePrice(price: number) {
        this._price = price;
        this.validate();
    }

    get price() {
        return this._price * 2;
    }

    changeName(name: string) {
        this._name = name;
        this.validate();
    }

    get name() {
        return this._name;
    }

    // get id(): string {
    //     return this._id;
    // }

    // get name(): string {
    //     return this._name;
    // }

    // get price(): number {
    //     return this._price;
    // }

    // set name(value: string) {
    //     this._name = value;
    // }

    // set price(value: number) {
    //     this._price = value;
    // }

}