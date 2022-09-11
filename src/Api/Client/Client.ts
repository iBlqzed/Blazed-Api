import { system, world } from "mojang-minecraft";
import { Commands } from "../Commands/index.js";
import { DatabaseUtils } from "../Database/index.js";
import { events } from '../Events/index.js'
import { ScoreboardManager } from "../Scoreboard/index.js";
import { Time } from "../Time/index.js";
import { Events, ClientOptions } from "../Types/index.js";
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
    readonly commands: Commands
    /**
     * Database utilities
     */
    readonly database = new DatabaseUtils()
    /**
     * Scoreboard manager
     */
    readonly scoreboards = new ScoreboardManager()
    /**
     * Mess with time stuff
     */
    readonly time = new Time()
    constructor(options?: ClientOptions) {
        if (options?.command) if (!options.command.prefix) options.command.prefix = '-'
        this.options = options
        if (options && "watchdog" in options && options.watchdog) system.events.beforeWatchdogTerminate.subscribe(data => (data.cancel = true))
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
    /**
     * Run an array of command
     * @param {string[]} cmds Commands to run
     */
    runCommands(cmds: string[]): void {
        const cR = /^%/
        if (cR.test(cmds[0])) throw new TypeError('[Server] >> First command in runCommands function can not be conditional')
        let cE = false
        for (const cM of cmds) {
            if (cE && cR.test(cM)) continue
            cE = this.runCommand(cM.replace(cR, '')).error
        }
    }
}