import { world } from "mojang-minecraft";
import { World } from "../World/index.js";
let arg;
export class WorldLoad {
    /**
     * Add a listener for the event
     */
    static on(callback) {
        if (this.registered)
            return;
        this.registered = true;
        arg = world.events.tick.subscribe(data => {
            try {
                world.getDimension('overworld').runCommand(`testfor @a`);
                world.events.tick.unsubscribe(arg);
                callback(new World());
            }
            catch { }
        });
    }
    /**
     * Remove the listener for the event
     */
    static off() {
        if (!this.registered)
            return;
        try {
            world.events.entityHit.unsubscribe(arg);
        }
        catch { }
        this.registered = false;
    }
}
/**
 * Whether or not the event has been registered
 */
WorldLoad.registered = false;
