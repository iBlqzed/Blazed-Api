import { world } from "mojang-minecraft";
import { Commands } from "../Commands/index.js";
import { DatabaseUtils } from "../Database/index.js";
import { Player } from "../Entity/index.js";
import { events } from '../Events/index'
import { Events, ClientOptions } from "../Types/index.js";
import { broadcastMessage } from "../utils.js";
import { World } from "../World/index";

export class Client {
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
     * Database utilities
     */
    readonly database = new DatabaseUtils()
    constructor(options?: ClientOptions) {
        if (options?.command) if (!options.command.prefix) options.command.prefix = '-'
        this.options = options
        this.commands = new Commands(options)
    }
    /**
     * Listen to an event, and run a callback off of it
     * @param {string} event Event to listen to
     * @param {(data: Events[eventName]) => void} callback Code to run when the event is called for
     */
    on<eventName extends keyof Events>(event: eventName, callback: (data: Events[eventName]) => void): any {
        //@ts-ignore
        return new events[event]().on(callback)
    }
    /**
     * Remove a listener for an event
     * @param {eventName} event Event to remove a listener from
     */
    off(event: any): void {
        try {
            event.off()
        } catch {
            this.world.broadcast(`§cYou can only input events in the client.off method`)
        }
    }
    /**
     * Listen to an event once
     * @param {eventName} event Event to listen for (once)
     * @param {(data: Events[eventName]) => void} callback Code to run when the event is called for
     */
    once<eventName extends keyof Events>(event: eventName, callback: (data: Events[eventName]) => void) {
        const arg = new events[event]().on((data) => {
            //@ts-ignore
            callback(data)
            arg.off()
        })
    }
    /**
     * Run a command
     * @param {string} cmd Command to run
     * @returns {{error: boolean, data: any}} Command error + data
     */
    runCommand(cmd: string): { error: boolean, data: any } {
        try {
            return { error: false, data: world.getDimension('overworld').runCommand(cmd) }
        } catch {
            return { error: true, data: undefined }
        }
    }
}