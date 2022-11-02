import { world } from "@minecraft/server";
export class TickTimeout {
    /**
     * Delay running a function
     * @param {() => void} callback Code to run when the time is up
     * @param {number} ticks Amount of ticks until the code is ran
     */
    constructor(callback, ticks) {
        this.ticks = ticks;
        ticks = 0;
        this.event = world.events.tick.subscribe(() => {
            if (this.ticks > ticks++)
                return;
            world.events.tick.unsubscribe(this.event);
            this.event = undefined;
            try {
                callback();
            }
            catch (e) {
                console.warn(`Error: ${e}, Stack: ${e.stack}`);
            }
        });
    }
    /**
     * Stop the tick timeout from running
     */
    destroy() {
        this.event && world.events.tick.unsubscribe(this.event);
    }
    /**
     * Set the amount of time until the function is ran
     * @param {number} ticks Amount of time until the function is ran
     */
    setTicks(ticks) {
        this.ticks = ticks;
    }
}
