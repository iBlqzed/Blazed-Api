import { DisplaySlot } from '../Types/index.js';
import { Scoreboard } from './Scoreboard.js';
export declare class ScoreboardManager {
    /**
     * Add a scoreboard objective to the world
     * @param {string} objective Objective to add
     * @param {string} display The display of the objective
     */
    addObjective(objective: string, display?: string): void;
    /**
     * Get a scoreboard objective
     * @param {string} objective Objective to get
     * @returns {Scoreboard} The scoreboard objective
     */
    getObjective(objective: string): Scoreboard;
    /**
     * Get a scoreboard objective at a display slot
     * @param {DisplaySlot} slot Slot to get the objective at
     * @returns {Scoreboard} The scoreboard objective
     */
    getObjectiveAtDisplaySlot(slot: DisplaySlot): Scoreboard;
    /**
     * Get all scoreboard objectives
     * @returns {Scoreboard[]} All scoreboard objectives
     */
    getObjectives(): Scoreboard[];
    /**
     * Remove a scoreboard objective from the world
     * @param {string} objective Objective to remove
     */
    removeObjective(objective: string): void;
}
