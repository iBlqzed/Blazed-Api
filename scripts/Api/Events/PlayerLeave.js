import { world } from "mojang-minecraft";
let arg;
export class PlayerLeave {
    /**
     * Add a listener for the event
     */
    static on(callback) {
        if (this.registered)
            return;
        this.registered = true;
        arg = world.events.playerLeave.subscribe(data => callback(data.playerName));
    }
    /**
     * Remove the listener for the event
     */
    static off() {
        if (!this.registered)
            return;
        world.events.playerLeave.unsubscribe(arg);
        this.registered = false;
    }
}
/**
 * Whether or not the event has been registered
 */
PlayerLeave.registered = false;
