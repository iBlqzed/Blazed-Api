import { world } from "mojang-minecraft";
let arg;
export class Tick {
    /**
     * Add a listener for the event
     */
    static on(callback) {
        if (this.registered)
            return;
        this.registered = true;
        arg = world.events.tick.subscribe(data => {
            callback();
        });
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
Tick.registered = false;
