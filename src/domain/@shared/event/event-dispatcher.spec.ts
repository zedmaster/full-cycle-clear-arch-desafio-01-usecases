import CustomerCreatedHandler1 from "../../customer/event/handler/customer-create-handler1.handler";
import CustomerCreatedHandler2 from "../../customer/event/handler/customer-create-handler2.handler";
import EventDispatcher from "./event-dispatcher";
import AddressChangedHandler from '../../customer/event/handler/address-changed.handler';
import SendEmailWhenProductIsCreatedHandler from "../../product/events/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../../product/events/product-created.event";
import { Address } from "../../customer/value-object/address";
import { Customer } from "../../customer/entity/customer";

describe("Domain events tests", () => {

    it("should register event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        
        eventDispatcher.register("productCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["productCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["productCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["productCreatedEvent"][0]).toMatchObject(eventHandler);
    })

    it("should unregister event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        
        eventDispatcher.register("productCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["productCreatedEvent"][0]).toMatchObject(eventHandler);


        eventDispatcher.unregister("productCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["productCreatedEvent"].length).toBe(0);
    })


    it("should unregister all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        
        eventDispatcher.register("productCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["productCreatedEvent"][0]).toMatchObject(eventHandler);

        eventDispatcher.unregisterAll();

        expect(eventDispatcher.getEventHandlers["productCreatedEvent"]).toBeUndefined();

    })

    it("should notify event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        const productCreatedEvent = new ProductCreatedEvent({
            name: "Product 1",
            description: "Product 1 description",
            price: 10.00
        });

        // Quando o evento for disparado, o método handle do eventHandler será chamado
        eventDispatcher.notify(productCreatedEvent);

        expect(spyEventHandler).toHaveBeenCalled();

    })


    it("should notify events when customer is created", () => {
        const customerCreatedEventHandler1 = new CustomerCreatedHandler1();
        const customerCreatedEventHandler2 = new CustomerCreatedHandler2();

        const eventDispatcher = new EventDispatcher();
        eventDispatcher.register("CustomerCreatedEvent", customerCreatedEventHandler1);
        eventDispatcher.register("CustomerCreatedEvent", customerCreatedEventHandler2);

        const spyCustomerCreatedEventHandler1 = jest.spyOn(customerCreatedEventHandler1, "handle");
        const spyCustomerCreatedEventHandler2 = jest.spyOn(customerCreatedEventHandler2, "handle");

        new Customer("12345678900", "Customer 1", eventDispatcher);


        expect(spyCustomerCreatedEventHandler1).toHaveBeenCalled();
        expect(spyCustomerCreatedEventHandler2).toHaveBeenCalled();

 

    })


    it("should notify events when customer address is changed", () => {
        const addressChangedEventHandler = new AddressChangedHandler();

        const eventDispatcher = new EventDispatcher();
        eventDispatcher.register("AddressChangedEvent", addressChangedEventHandler);
        
        const spyCustomerCreatedEventHandler1 = jest.spyOn(addressChangedEventHandler, "handle");

        const customer = new Customer("12345678900", "Customer 1", eventDispatcher);
        customer.changeAddress(new Address("Rua 1", "123", "Cidade 1", "Estado 1", "12345678"));
''
        expect(spyCustomerCreatedEventHandler1).toHaveBeenCalled();
    })
})