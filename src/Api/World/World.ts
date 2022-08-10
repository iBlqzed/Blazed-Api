import { world } from "mojang-minecraft";
import { Player } from "../Entity/index.js";
import { Dimension } from "./Dimension.js";
import { Dimension as DimensionType } from "../Types/Dimension.js";

export class World {
    /**
     * Get all players in the world
     * @returns {Player[]} All players in the world
     */
    getAllPlayers(): Player[] {
        return Array.from(world.getPlayers(), pL => new Player(pL))
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
     * Get the current tick (kinda like Date.now() but ticks)
     * @returns {Promise<number>} The current tick
     */
    async getCurrentTick(): Promise<number> {
        return await new Promise(resolve => world.events.tick.subscribe(({ currentTick }) => resolve(currentTick)))
    }
}