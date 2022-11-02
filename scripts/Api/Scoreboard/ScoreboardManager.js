import { world } from '@minecraft/server';
import { Scoreboard } from './Scoreboard.js';
export class ScoreboardManager {
    /**
     * Add a scoreboard objective to the world
     * @param {string} objective Objective to add
     * @param {string} display The display of the objective
     */
    addObjective(objective, display) {
        world.scoreboard.addObjective(objective, display ?? '');
    }
    /**
     * Get a scoreboard objective
     * @param {string} objective Objective to get
     * @returns {Scoreboard} The scoreboard objective
     */
    getObjective(objective) {
        return new Scoreboard(world.scoreboard.getObjective(objective));
    }
    /**
     * Get a scoreboard objective at a display slot
     * @param {DisplaySlot} slot Slot to get the objective at
     * @returns {Scoreboard} The scoreboard objective
     */
    getObjectiveAtDisplaySlot(slot) {
        const e = world.scoreboard.getObjectiveAtDisplaySlot(slot)?.objective;
        return e ? new Scoreboard(e) : undefined;
    }
    /**
     * Get all scoreboard objectives
     * @returns {Scoreboard[]} All scoreboard objectives
     */
    getObjectives() {
        return world.scoreboard.getObjectives().map(e => new Scoreboard(e));
    }
    /**
     * Remove a scoreboard objective from the world
     * @param {string} objective Objective to remove
     */
    removeObjective(objective) {
        world.scoreboard.removeObjective(objective);
    }
}
