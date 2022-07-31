import { world } from "mojang-minecraft";
import { Player } from "../Entity/index.js";
import { clearTickTimeout, setTickTimeout } from "../utils.js";
let arg;
export class PlayerJoin {
    /**
     * Add a listener for the event
     */
    static on(callback) {
        if (this.registered)
            return;
        this.registered = true;
        arg = world.events.playerJoin.subscribe(data => {
            const player = data.player;
            const timeout = setTickTimeout(() => {
                const plr = [...world.getPlayers()].find(plr => plr.name === player.name);
                if (plr) {
                    callback(new Player(plr));
                    clearTickTimeout(timeout);
                }
            }, 1, true);
        });
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
