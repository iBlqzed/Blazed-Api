import { Events } from "../Types/index.js";
export declare class ItemUseOn {
    /**
     * The actual arg
     */
    protected arg: any;
    /**
     * Add a listener for the event
     */
    on(callback: (data: Events['ItemUseOn']) => void): ItemUseOn;
    /**
     * Remove the listener for the event
     */
    off(): void;
}
