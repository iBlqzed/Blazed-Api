import { EntityQueryOptions, world } from "@minecraft/server";
import { Player } from "../Entity/index.js";
import { Dimension } from "./Dimension.js";
import { Dimension as DimensionType } from "../Types/Dimension.js";
import { runCommand } from "../utils.js";

export class World {
    /**
     * Broadcast a message for everyone to see
     * @param {string} message Message to broadcast
     */
    broadcast(message: string): void {
        runCommand(`tellraw @a {"rawtext":[{"text":${JSON.stringify(message)}}]}`)
    }
    /**
     * Get all players in the world
     * @param {EntityQueryOptions} options Query options
     * @returns {Player[]} All players in the world
     */
    getAllPlayers(options?: EntityQueryOptions): Player[] {
        return Array.from(world.getPlayers(options), plr => new Player(plr))
    }
    /**
     * Get the current tick (kinda like Date.now() but ticks)
     * @returns {number} The current tick
     */
    getCurrentTick(): number {
        return currentTick
    }
    /**
     * Get a dimension from a string
     * @param {DimensionType} dimension Dimension to get
     * @returns {Dimension} The actual dimension
     */
    getDimension(dimension: DimensionType): Dimension {
        return new Dimension(world.getDimension(dimension))
    }
    /**
     * Get the world's tps
     * @returns {number} The tps of the world
     */
    getTps(): number {
        return tps
    }
}

let tps = 20
let currentTick = 0

world.events.tick.subscribe((data) => {
    currentTick = data.currentTick
    tps = Math.min(Number((1 / data.deltaTime).toFixed(2)), 20)
})