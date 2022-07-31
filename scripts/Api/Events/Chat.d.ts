import { Events } from "../Types/index";
export declare class Chat {
    /**
     * Whether or not the event has been registered
     */
    static registered: boolean;
    /**
     * Add a listener for the event
     */
    static on(callback: (data: Events['Chat']) => void): void;
    /**
     * Remove the listener for the event
     */
    static off(): void;
}
