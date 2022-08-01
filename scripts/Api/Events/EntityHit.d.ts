import { Events } from "../Types/index";
export declare class EntityHit {
    /**
     * Whether or not the event has been registered
     */
    static registered: boolean;
    /**
     * Add a listener for the event
     */
    static on(callback: (data: Events['EntityHit']) => void): void;
    /**
     * Remove the listener for the event
     */
    static off(): void;
}
