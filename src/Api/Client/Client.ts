import { Commands } from "../Commands/index.js";
import * as events from '../Events/index'
import { Events, ClientOptions } from "../Types/index.js";
import { World } from "../World/index";

let isClient = false

export class Client {
    constructor(options?: ClientOptions) {
        if (isClient) throw new Error("There can only be 1 client!")
        isClient = true
        this.options = options
        this.commands = new Commands(options)
    }
    /**
     * The client options
     */
    readonly options?: ClientOptions
    /**
     * Defines interactions done with the world
     */
    readonly world = new World()
    /**
     * Create and remove game commands
     */
    readonly commands = new Commands()
    /**
     * Listen to an event, and run a callback off of it
     * @param {string} event Event to listen to
     * @param {(data: Events[eventName]) => void} callback Code to run when the event is called for
     */
    on<eventName extends keyof Events>(event: eventName, callback: (data: Events[eventName]) => void) {
        //@ts-ignore
        events[event].on(callback)
    }
    /**
     * Remove a listener for an event
     * @param {eventName} event Event to remove a listener from
     */
    off<eventName extends keyof Events>(event: eventName) {
        events[event].off()
    }
    /**
     * Listen to an event once
     * @param {eventName} event Event to listen for (once)
     * @param {(data: Events[eventName]) => void} callback Code to run when the event is called for
     */
    once<eventName extends keyof Events>(event: eventName, callback: (data: Events[eventName]) => void) {
        events[event].on((data) => {
            //@ts-ignore
            callback(data)
            events[event].off()
        })
    }
}