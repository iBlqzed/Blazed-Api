import { Entity, Player } from "../Entity/index.js";
export class Scoreboard {
    constructor(scoreboard) {
        this._scoreboard = scoreboard;
    }
    /**
     * Get the display name of the scoreboard
     * @returns {string} The display name of the scoreboard
     */
    getDisplayName() {
        return this._scoreboard.displayName;
    }
    /**
     * Get the scoreboard's name
     * @returns {string} The scoreboard's name
     */
    getName() {
        return this._scoreboard.id;
    }
    /**
     * Get an entity's score on the scoreboard
     * @param {Entity | string} entity Entity to get the score of (also fake players)
     * @returns {number} The score on the scoreboard (or NaN if no score)
     */
    getScore(entity) {
        try {
            return this._scoreboard.getScore(entity instanceof Entity ? entity.getIEntity().scoreboard : this._scoreboard.getParticipants().find(e => e.displayName === entity));
        }
        catch {
            return NaN;
        }
    }
    /**
     * Get all scores on the scoreboard
     * @returns {ScoreboardEntity[]} The entity scores
     */
    getScores() {
        //@ts-ignore
        return this._scoreboard.getScores().map(e => { return { entity: e.participant.type === 'fakePlayer' ? e.participant.displayName : e.participant.getEntity().typeId === "minecraft:player" ? new Player(e.participant.getEntity()) : new Entity(e.participant.getEntity()), score: e.score }; });
    }
}
