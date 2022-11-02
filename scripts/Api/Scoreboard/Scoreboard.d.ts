import { ScoreboardObjective } from "@minecraft/server";
import { Entity } from "../Entity/index.js";
import { ScoreboardEntity } from "../Types/index.js";
export declare class Scoreboard {
    protected _scoreboard: ScoreboardObjective;
    constructor(scoreboard: ScoreboardObjective);
    /**
     * Get the display name of the scoreboard
     * @returns {string} The display name of the scoreboard
     */
    getDisplayName(): string;
    /**
     * Get the scoreboard's name
     * @returns {string} The scoreboard's name
     */
    getName(): string;
    /**
     * Get an entity's score on the scoreboard
     * @param {Entity | string} entity Entity to get the score of (also fake players)
     * @returns {number} The score on the scoreboard (or NaN if no score)
     */
    getScore(entity: Entity | string): number;
    /**
     * Get all scores on the scoreboard
     * @returns {ScoreboardEntity[]} The entity scores
     */
    getScores(): ScoreboardEntity[];
}
