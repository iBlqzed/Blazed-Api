import { TickEvent } from "@minecraft/server";
export declare class TickInterval {
    protected event: (arg: TickEvent) => void;
    protected ticks: number;
    /**
     * Delay running a function repeatidly
     * @param {() => void} callback Code to run when the time is up
     * @param {number} ticks Amount of ticks until the code is ran
     */
    constructor(callback: () => void, ticks: number);
    /**
     * Stop the tick interval from running
     */
    destroy(): void;
    /**
     * Set the amount of time until the function is ran again
     * @param {number} ticks Amount of time until the function is ran again
     */
    setTicks(ticks: number): void;
}
