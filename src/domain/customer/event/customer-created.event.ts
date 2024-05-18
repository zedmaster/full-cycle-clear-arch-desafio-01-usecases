import EventInterface from "../../@shared/event/event.interface";
import { Customer } from "../entity/customer";


export default class CustomerCreatedEvent implements EventInterface{
    
        dateTimeOccurred: Date;
        eventData: Customer;
    
        constructor(eventData: Customer) {
            this.dateTimeOccurred = new Date();
            this.eventData = eventData;
        }
}