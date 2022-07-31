import { Player } from "../Entity/index.js";
import { Dimension } from "./Dimension.js";
import { Dimension as DimensionType } from "../Types/Dimension.js";
export declare class World {
    /**
     * Get all players in the world
     * @returns {Player[]} All players in the world
     */
    getAllPlayers(): Player[];
    /**
     * Get a dimension from a string
     * @param {DimensionType} dimension Dimension to get
     * @returns {Dimension} The actual dimension
     */
    getDimension(dimension: DimensionType): Dimension;
}
