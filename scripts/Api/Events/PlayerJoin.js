import { world } from "mojang-minecraft";
import { Player } from "../Entity/index.js";
let arg;
export class PlayerJoin {
    /**
     * Add a listener for the event
     */
    static on(callback) {
        if (this.registered)
            return;
        this.registered = true;
        arg = world.events.playerJoin.subscribe(data => callback(new Player(data.player)));
    }
    /**
     * Remove the listener for the event
     */
    static off() {
        if (!this.registered)
            return;
        world.events.playerJoin.unsubscribe(arg);
        this.registered = false;
    }
}
/**
 * Whether or not the event has been registered
 */
PlayerJoin.registered = false;
