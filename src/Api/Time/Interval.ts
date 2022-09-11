import { TickEvent, world } from "mojang-minecraft";

export class TickInterval {
    protected event: (arg: TickEvent) => void
    protected ticks: number
    /**
     * Delay running a function repeatidly
     * @param {() => void} callback Code to run when the time is up
     * @param {number} ticks Amount of ticks until the code is ran
     */
    constructor(callback: () => void, ticks: number) {
        this.ticks = ticks
        this.event = world.events.tick.subscribe(({ currentTick }) => {
            if (currentTick % this.ticks !== 0) return
            try { callback() } catch (e) { console.warn(`Error: ${e}, Stack: ${e.stack}`) }
        })
    }
    /**
     * Stop the tick interval from running
     */
    destroy() {
        this.event && world.events.tick.unsubscribe(this.event)
    }
    /**
     * Set the amount of time until the function is ran again
     * @param {number} ticks Amount of time until the function is ran again
     */
    setTicks(ticks: number) {
        this.ticks = ticks
    }
}