import { Commands } from "../Commands/index.js";
import { Events, ClientOptions } from "../Types/index.js";
import { World } from "../World/index";
export declare class Client {
    constructor(options?: ClientOptions);
    /**
     * The client options
     */
    readonly options?: ClientOptions;
    /**
     * Defines interactions done with the world
     */
    readonly world: World;
    /**
     * Create and remove game commands
     */
    readonly commands: Commands;
    /**
     * Listen to an event, and run a callback off of it
     * @param {string} event Event to listen to
     * @param {(data: Events[eventName]) => void} callback Code to run when the event is called for
     */
    on<eventName extends keyof Events>(event: eventName, callback: (data: Events[eventName]) => void): void;
    /**
     * Remove a listener for an event
     * @param {eventName} event Event to remove a listener from
     */
    off<eventName extends keyof Events>(event: eventName): void;
    /**
     * Listen to an event once
     * @param {eventName} event Event to listen for (once)
     * @param {(data: Events[eventName]) => void} callback Code to run when the event is called for
     */
    once<eventName extends keyof Events>(event: eventName, callback: (data: Events[eventName]) => void): void;
}
