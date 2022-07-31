import { world } from "mojang-minecraft";
import { Player } from "../Entity/index.js";
import { Dimension } from "./Dimension.js";
export class World {
    /**
     * Get all players in the world
     * @returns {Player[]} All players in the world
     */
    getAllPlayers() {
        return Array.from(world.getPlayers(), pL => new Player(pL));
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