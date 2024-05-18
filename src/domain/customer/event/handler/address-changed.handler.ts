
import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import AddressChangedEvent from "../address-changed-event";

export default class AddressChangedHandler implements EventHandlerInterface<AddressChangedEvent> {
    handle(event: AddressChangedEvent): void {
        const { id, name, address } = event.eventData;
        const { street, number, city, state, zipCode } = address;
        console.log(`Endereço do cliente ${id}, ${name} foi alterado para: ${street}, ${number}. ${city} - ${state}. Zip Code: ${zipCode}`);
    }
}