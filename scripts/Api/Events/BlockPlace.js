import { world } from "mojang-minecraft";
import { Player } from "../Entity/index.js";
let arg;
export class BlockPlace {
    /**
     * Add a listener for the event
     */
    static on(callback) {
        if (this.registered)
            return;
        this.registered = true;
        arg = world.events.blockPlace.subscribe(({ player, block }) => {
            callback({
                player: new Player(player),
                block: block
            });
        });
    }
    /**
     * Remove the listener for the event
     */
    static off() {
        if (!this.registered)
            return;
        world.events.blockPlace.unsubscribe(arg);
        this.registered = false;
    }
}
/**
 * Whether or not the event has been registered
 */
BlockPlace.registered = false;
