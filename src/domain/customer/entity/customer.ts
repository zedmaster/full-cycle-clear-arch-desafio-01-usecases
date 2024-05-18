import EventDispatcherInterface from "../../@shared/event/event-dispatcher.interface";
import AddressChangedEvent from "../event/address-changed-event";
import CustomerCreatedEvent from "../event/customer-created.event";
import { Address } from "../value-object/address";


export class Customer {
  private _name: string;
  private _id: string;
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;
  private _eventDispatcher: EventDispatcherInterface;

    constructor(id: string, name: string, 
        eventDispatcher?: EventDispatcherInterface) {
        this._name = name;
        this._id = id;
        this.validate();
        
        this._eventDispatcher = eventDispatcher;

        if(this._eventDispatcher){
            const customerCreatedEvent = new CustomerCreatedEvent(this);
            this._eventDispatcher.notify(customerCreatedEvent);
        }
    }

    get id() {
        return this._id;
    }

    get rewardPoints() : number {
        return this._rewardPoints;
    }

    addRewardPoints(points: number) {
        this._rewardPoints += points;
    }

    get name() {
        return this._name;
    }

    get address(){
        return this._address;
    }

    isActive() {
        return this._active;
    }

    validate() {

        if (this._name.length === 0) {
            throw new Error("Name is required");

        }

        if (this._id.length === 0) {
            throw new Error("Id is required");
        }

        return true;
    }

    changeName(name: string) {
        this._name = name;
        this.validate();
    }

    activate() {    
        if(this._address === undefined){
            throw new Error("Address is mandatory to activate a customer");
        }
        this._active = true;
    }

    changeAddress(address: Address) {
        this._address = address;
        if(this._eventDispatcher){
            this._eventDispatcher.notify(new AddressChangedEvent(this));
        }
    }


    deactivate() {
        this._active = false;
    }

   
}