import { world, BlockLocation, Location } from "@minecraft/server";
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
 * @param {Entity} executor Entity or Dimesion to run the command
 * @example runCommand(`give @s diamond`, player)
 */
export function runCommand(cmd, executor) {
    return (executor ?? world.getDimension("overworld")).runCommandAsync(cmd);
}
