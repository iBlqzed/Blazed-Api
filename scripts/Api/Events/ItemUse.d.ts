import { Events } from "../Types/index.js";
export declare class ItemUse {
    /**
     * Whether or not the event has been registered
     */
    static registered: boolean;
    /**
     * Add a listener for the event
     */
    static on(callback: (data: Events['ItemUse']) => void): void;
    /**
     * Remove the listener for the event
     */
    static off(): void;
}