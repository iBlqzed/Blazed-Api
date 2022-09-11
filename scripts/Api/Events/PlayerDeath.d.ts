import { Events } from "../Types/index.js";
export declare class PlayerDeath {
    /**
     * The actual arg
     */
    protected args: any[];
    /**
     * Add a listener for the event
     */
    on(callback: (data: Events['PlayerDeath']) => void): PlayerDeath;
    /**
     * Remove the listener for the event
     */
    off(): void;
}
