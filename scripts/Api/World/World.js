import { world } from "mojang-minecraft";
import { allPlayers } from "../Entity/index.js";
import { Dimension } from "./Dimension.js";
import { runCommand } from "../utils.js";
export class World {
    /**
     * Broadcast a message for everyone to see
     * @param {string} message Message to broadcast
     */
    broadcast(message) {
        runCommand(`tellraw @a {"rawtext":[{"text":${JSON.stringify(message)}}]}`);
    }
    /**
     * Get all players in the world
     * @returns {Player[]} All players in the world
     */
    getAllPlayers() {
        return allPlayers;
    }
    /**
     * Get the current tick (kinda like Date.now() but ticks)
     * @returns {Promise<number>} The current tick
     */
    async getCurrentTick() {
        return await new Promise(resolve => {
            const arg = world.events.tick.subscribe(({ currentTick }) => {
                resolve(currentTick);
                world.events.tick.unsubscribe(arg);
            });
        });
    }
    /**
     * Get a dimension from a string
     * @param {DimensionType} dimension Dimension to get
     * @returns {Dimension} The actual dimension
     */
    getDimension(dimension) {
        return new Dimension(world.getDimension(dimension));
    }
}
