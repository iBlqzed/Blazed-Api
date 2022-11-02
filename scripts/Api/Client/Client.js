import { system, world } from "@minecraft/server";
import { Commands } from "../Commands/index.js";
import { DatabaseUtils } from "../Database/index.js";
import { events } from '../Events/index.js';
import { ScoreboardManager } from "../Scoreboard/index.js";
import { Time } from "../Time/index.js";
import { World } from "../World/index";
export class Client {
    constructor(options) {
        /**
         * Defines interactions done with the world
         */
        this.world = new World();
        /**
         * Database utilities
         */
        this.database = new DatabaseUtils();
        /**
         * Scoreboard manager
         */
        this.scoreboards = new ScoreboardManager();
        /**
         * Mess with time stuff
         */
        this.time = new Time();
        if (options?.command)
            if (!options.command.prefix)
                options.command.prefix = '-';
        this.options = options;
        if (options && "watchdog" in options && options.watchdog)
            system.events.beforeWatchdogTerminate.subscribe(data => (data.cancel = true));
        this.commands = new Commands(options);
    }
    /**
     * Listen to an event, and run a callback off of it
     * @param {string} event Event to listen to
     * @param {(data: Events[eventName]) => void} callback Code to run when the event is called for
     */
    on(event, callback) {
        //@ts-ignore
        return new events[event]().on(callback);
    }
    /**
     * Remove a listener for an event
     * @param {eventName} event Event to remove a listener from
     */
    off(event) {
        try {
            event.off();
        }
        catch {
            this.world.broadcast(`§cYou can only input events in the client.off method`);
        }
    }
    /**
     * Listen to an event once
     * @param {eventName} event Event to listen for (once)
     * @param {(data: Events[eventName]) => void} callback Code to run when the event is called for
     */
    once(event, callback) {
        const arg = new events[event]().on((data) => {
            //@ts-ignore
            callback(data);
            arg.off();
        });
    }
    /**
     * Run a command
     * @param {string} cmd Command to run
     * @returns {{error: boolean, data: any}} Command error + data
     * @deprecated Please try runCommandAsync, this is soon to no longer work
     */
    runCommand(cmd) {
        try {
            return { error: false, data: world.getDimension('overworld').runCommand(cmd) };
        }
        catch {
            return { error: true, data: undefined };
        }
    }
    /**
     * Run an async command
     * @param {string} cmd Command to run
     * @returns {Promise<CommandResult>} Command result
     */
    runCommandAsync(cmd) {
        return world.getDimension('overworld').runCommandAsync(cmd);
    }
    /**
     * Run an array of command
     * @param {string[]} cmds Commands to run
     */
    runCommands(cmds) {
        for (const cM of cmds)
            this.runCommandAsync(cM);
    }
}
