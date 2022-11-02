import { BlockLocation, Location, CommandResult, Dimension } from "@minecraft/server";
import { Entity } from "./Entity/index";
/**
 * Broadcast a message
 * @param {string} message Message to broadcast
 * @example broadcastMessage('This message was sent to everyone!')
 */
export declare function broadcastMessage(message: string): void;
export declare const locationFunctions: {
    /**
     * Converts a location to a block location
     * @param {Location} loc The BlockLocation of the Location
     * @returns {BlockLocation} The block location of the location
     */
    locationToBlockLocation(loc: Location): BlockLocation;
    /**
     * Converts a block location to a location
     * @param {BlockLocation} loc The Location of the BlockLocation
     * @returns {Location} The location of the block location
     */
    blockLocationToLocation(loc: BlockLocation): Location;
    /**
     * Convert coords into a location
     * @param {[number, number, number]} coords Coords to turn into a location
     * @returns {Location} Location from the coords
     */
    coordsToLocation(coords: [number, number, number]): Location;
    /**
     * Convert coords into a block location
     * @param {[number, number, number]} coords Coords to turn into a block location
     * @returns {BlockLocation} BlockLocation from the coords
     */
    coordsToBlockLocation(coords: [number, number, number]): BlockLocation;
    /**
     * Convert a location to coords
     * @param {Location} loc Location to convert into coords
     * @returns {[number, number, number]} Coords
     */
    locationToCoords(loc: Location): [number, number, number];
    /**
     * Convert a block location to coords
     * @param {BlockLocation} loc BlockLocation to convert into coords
     * @returns {[number, number, number]} Coords
     */
    blockLocationToCoords(loc: BlockLocation): [number, number, number];
};
/**
 * Run a command!
 * @param {string} cmd Command to run
 * @param {Entity} executor Entity or Dimesion to run the command
 * @example runCommand(`give @s diamond`, player)
 */
export declare function runCommand(cmd: string, executor?: Entity | Dimension): Promise<CommandResult>;
