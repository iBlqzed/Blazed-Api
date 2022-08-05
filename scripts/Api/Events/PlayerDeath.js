import { world } from "mojang-minecraft";
let arg;
export class EntityEvent {
    /**
     * Add a listener for the event
     */
    static on(callback) {
        if (this.registered)
            return;
        this.registered = true;
        const deadPlayers = [];
    }
    /**
     * Remove the listener for the event
     */
    static off() {
        if (!this.registered)
            return;
        world.events.tick.unsubscribe(arg);
        this.registered = false;
    }
}
/**
 * Whether or not the event has been registered
 */
EntityEvent.registered = false;
