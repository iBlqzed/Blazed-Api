import { world, BlockLocation, Location } from "mojang-minecraft";
/**
 * Get the score of a target on an objective
 * @param {string} objective Objective to get a score from
 * @param {Entity|string} target The entity, player, or fake player to get the score of
 * @param {boolean} useZero Specifies whether to return NaN or 0 if an error is thrown
 * @returns {number} The target's score, or NaN / 0 if error
 * @example getScore('Money', player, true) //Returns the value of the scoreboard "Money", or 0 if error
 */
export function getScore(objective, target, useZero) {
    try {
        const oB = world.scoreboard.getObjective(objective);
        if (typeof target == 'string')
            return oB.getScore(oB.getParticipants().find(pT => pT.displayName == target));
        return oB.getScore(target.scoreboard);
    }
    catch {
        return useZero ? 0 : NaN;
    }
}
/**
 * Delay executing a function
 * @param {() => void} callback Code you want to execute when the delay is finished
 * @param {number} tick Time in ticks until the callback runs
 * @param {boolean} loop Whether or not the code should loop or not
 * @example setTickTimeout(() => {
 * console.warn(`This was called after 20 ticks!`)
 * }, 20)
 */
export function setTickTimeout(callback, tick, loop) {
    let cT = 0;
    const tE = world.events.tick.subscribe((data) => {
        if (cT === 0)
            cT = data.currentTick + tick;
        if (cT <= data.currentTick) {
            try {
                callback();
            }
            catch (e) {
                console.warn(`${e} : ${e.stack}`);
            }
            if (loop)
                cT += tick;
            else
                world.events.tick.unsubscribe(tE);
        }
    });
}
/**
 * Broadcast a message
 * @param {string} message Message to broadcast
 * @example broadcastMessage('This message was sent to everyone!')
 */
export function broadcastMessage(message) {
    world.getDimension('overworld').runCommand(`tellraw @a {"rawtext":[{"text":${JSON.stringify(message)}}]}`);
}
export const locationFunctions = {
    /**
     * Converts a location to a block location
     * @param {Location} loc The BlockLocation of the Location
     * @returns {BlockLocation} The block location of the location
     */
    locationToBlockLocation(loc) {
        return new BlockLocation(Math.floor(loc.x), Math.floor(loc.y), Math.floor(loc.z));
    },
    /**
     * Converts a block location to a location
     * @param {BlockLocation} loc The Location of the BlockLocation
     * @returns {Location} The location of the block location
     */
    blockLocationToLocation(loc) {
        return new Location(loc.x, loc.y, loc.z);
    },
    /**
     * Convert coords into a location
     * @param {[number, number, number]} coords Coords to turn into a location
     * @returns {Location} Location from the coords
     */
    coordsToLocation(coords) {
        return new Location(coords[0], coords[1], coords[2]);
    },
    /**
     * Convert coords into a block location
     * @param {[number, number, number]} coords Coords to turn into a block location
     * @returns {BlockLocation} BlockLocation from the coords
     */
    coordsToBlockLocation(coords) {
        return new BlockLocation(Math.floor(coords[0]), Math.floor(coords[1]), Math.floor(coords[2]));
    },
    /**
     * Convert a location to coords
     * @param {Location} loc Location to convert into coords
     * @returns {[number, number, number]} Coords
     */
    locationToCoords(loc) {
        return [loc.x, loc.y, loc.z];
    },
    /**
     * Convert a block location to coords
     * @param {BlockLocation} loc BlockLocation to convert into coords
     * @returns {[number, number, number]} Coords
     */
    blockLocationToCoords(loc) {
        return [loc.x, loc.y, loc.z];
    }
};
/**
 * Run a command!
 * @param {string} cmd Command to run
 * @param {Entity} executor Entity to run the command
 * @returns {{ error: boolean, data: any }} Whether or not the command errors, and command data
 * @example runCommand(`give @s diamond`, player)
 */
export function runCommand(cmd, executor) {
    try {
        if (executor)
            return { error: false, data: executor.runCommand(cmd) };
        return { error: false, data: world.getDimension('overworld').runCommand(cmd) };
    }
    catch {
        return { error: true, data: undefined };
    }
}
/**
 * Run an array of commands (if a command starts with "%", then it will be conditional!)
 * @param {string[]} commands Commands to run
 * @param {Entity} executor Entity to run all of the commands
 * @returns {{error: boolean}} Whether or not there was an error running all the commands
 * @example runCommands([
 * `testfor @s[hasitem={item=dirt}]`,
 * `%say I have dirt in my hand!`
 * ], player)
 */
export function runCommands(commands, executor) {
    try {
        const cR = /^%/;
        if (cR.test(commands[0]))
            throw new TypeError('[Server] >> First command in runCommands function can not be conditional');
        let cE = false;
        for (const cM of commands) {
            if (cE && cR.test(cM))
                continue;
            cE = runCommand(cM.replace(cR, ''), executor).error;
        }
        return { error: false };
    }
    catch {
        return { error: true };
    }
}
