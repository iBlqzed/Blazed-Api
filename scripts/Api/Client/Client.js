import { Commands } from "../Commands/index.js";
import { DatabaseUtils } from "../Database/index.js";
import * as events from '../Events/index';
import { World } from "../World/index";
let isClient = false;
export class Client {
    constructor(options) {
        /**
         * Defines interactions done with the world
         */
        this.world = new World();
        /**
         * Create and remove game commands
         */
        this.commands = new Commands();
        /**
         * Database utilities
         */
        this.database = new DatabaseUtils();
        if (isClient)
            throw new Error("There can only be 1 client!");
        isClient = true;
        this.options = options;
        this.commands = new Commands(options);
    }
    /**
     * Listen to an event, and run a callback off of it
     * @param {string} event Event to listen to
     * @param {(data: Events[eventName]) => void} callback Code to run when the event is called for
     */
    on(event, callback) {
        //@ts-ignore
        events[event].on(callback);
    }
    /**
     * Remove a listener for an event
     * @param {eventName} event Event to remove a listener from
     */
    off(event) {
        events[event].off();
    }
    /**
     * Listen to an event once
     * @param {eventName} event Event to listen for (once)
     * @param {(data: Events[eventName]) => void} callback Code to run when the event is called for
     */
    once(event, callback) {
        events[event].on((data) => {
            //@ts-ignore
            callback(data);
            events[event].off();
        });
    }
}
