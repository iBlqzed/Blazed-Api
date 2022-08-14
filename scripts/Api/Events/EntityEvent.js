import { world } from "mojang-minecraft";
import { Entity } from "../Entity/index.js";
export class EntityEvent {
    constructor() {
        /**
         * The actual arg
         */
        this.arg = undefined;
    }
    /**
     * Add a listener for the event
     */
    on(callback) {
        this.arg = world.events.beforeDataDrivenEntityTriggerEvent.subscribe(data => {
            callback({
                entity: new Entity(data.entity),
                modifiers: data.modifiers,
                id: data.id,
                cancel() {
                    data.cancel = true;
                }
            });
        });
        return this;
    }
    /**
     * Remove the listener for the event
     */
    off() {
        world.events.beforeDataDrivenEntityTriggerEvent.unsubscribe(this.arg);
    }
}
