import { world } from "mojang-minecraft";
import { World } from "../World/index.js";
export class WorldLoad {
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
        this.arg = world.events.tick.subscribe(() => {
            try {
                world.getDimension('overworld').runCommand(`testfor @a`);
                callback(new World());
                world.events.tick.unsubscribe(this.arg);
            }
            catch { }
        });
        return this;
    }
    /**
     * Remove the listener for the event
     */
    off() {
        try {
            world.events.entityHit.unsubscribe(this.arg);
        }
        catch { }
    }
}
