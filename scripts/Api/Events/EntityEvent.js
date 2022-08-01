import { world } from "mojang-minecraft";
import { Entity } from "../Entity/index.js";
let arg;
export class EntityEvent {
    /**
     * Add a listener for the event
     */
    static on(callback) {
        if (this.registered)
            return;
        this.registered = true;
        arg = world.events.beforeDataDrivenEntityTriggerEvent.subscribe(data => {
            callback({
                entity: new Entity(data.entity),
                modifiers: data.modifiers,
                id: data.id,
                cancel() {
                    data.cancel = true;
                }
            });
        });
    }
    /**
     * Remove the listener for the event
     */
    static off() {
        if (!this.registered)
            return;
        world.events.beforeDataDrivenEntityTriggerEvent.unsubscribe(arg);
        this.registered = false;
    }
}
/**
 * Whether or not the event has been registered
 */
EntityEvent.registered = false;
