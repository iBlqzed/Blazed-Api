import { world } from "@minecraft/server";
import { TickInterval } from "./Interval";
import { TickTimeout } from "./Timeout";
export class Time {
    /**
     * Delay running a function
     * @param {() => void} callback Code to run when the time is up
     * @param {number} ticks Amount of ticks until the code is ran
     */
    setTickTimeout(callback, ticks) {
        return new TickTimeout(callback, ticks);
    }
    /**
     * Delay running a function repeatidly
     * @param {() => void} callback Code to run when the time is up
     * @param {number} ticks Amount of ticks until the code is ran
     */
    setTickInterval(callback, ticks) {
        return new TickInterval(callback, ticks);
    }
    /**
     * Wait a certain amount of ticks
     * @param {number} ticks Amount of ticks to wait
     */
    async wait(ticks) {
        let t = 0;
        return await new Promise(resolve => {
            const event = world.events.tick.subscribe(({ currentTick }) => {
                if (t === 0)
                    t = currentTick + ticks;
                if (!(t < currentTick))
                    return;
                world.events.tick.unsubscribe(event);
                resolve();
            });
        });
    }
}
