import { system } from "@minecraft/server";
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
        this.arg = true;
        system.run(() => {
            if (this.arg)
                callback(new World());
        });
        return this;
    }
    /**
     * Remove the listener for the event
     */
    off() {
        this.arg = false;
    }
}
