import { world } from "mojang-minecraft";
import { Player } from "../Entity/index";
let arg;
export class Chat {
    /**
     * Add a listener for the event
     */
    static on(callback) {
        if (this.registered)
            return;
        this.registered = true;
        arg = world.events.beforeChat.subscribe(data => {
            callback({
                player: new Player(data.sender),
                message: data.message,
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
        world.events.beforeChat.unsubscribe(arg);
        this.registered = false;
    }
}
/**
 * Whether or not the event has been registered
 */
Chat.registered = false;
