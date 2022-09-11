import { TickInterval } from "./Interval";
import { TickTimeout } from "./Timeout";
export declare class Time {
    /**
     * Delay running a function
     * @param {() => void} callback Code to run when the time is up
     * @param {number} ticks Amount of ticks until the code is ran
     */
    setTickTimeout(callback: () => void, ticks: number): TickTimeout;
    /**
     * Delay running a function repeatidly
     * @param {() => void} callback Code to run when the time is up
     * @param {number} ticks Amount of ticks until the code is ran
     */
    setTickInterval(callback: () => void, ticks: number): TickInterval;
    /**
     * Wait a certain amount of ticks
     * @param {number} ticks Amount of ticks to wait
     */
    wait(ticks: number): Promise<void>;
}
