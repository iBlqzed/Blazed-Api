import { world } from "@minecraft/server";
import { Player } from "../Entity/index.js";
export class PlayerDeath {
    constructor() {
        /**
         * The actual arg
         */
        this.args = [];
    }
    /**
     * Add a listener for the event
     */
    on(callback) {
        const deadPlayers = new Set();
        this.args.push(world.events.tick.subscribe(() => {
            for (const a of world.getPlayers()) {
                if (a.getComponent("health").current <= 0 && !deadPlayers.has(a.name)) {
                    callback(new Player(a));
                    deadPlayers.add(a.name);
                }
                if (deadPlayers.has(a.name) && a.getComponent("health").current > 0)
                    deadPlayers.delete(a.name);
            }
        }), world.events.playerLeave.subscribe(({ playerName }) => {
            deadPlayers.delete(playerName);
        }));
        return this;
    }
    /**
     * Remove the listener for the event
     */
    off() {
        world.events.tick.unsubscribe(this.args[0]);
        world.events.playerLeave.unsubscribe(this.args[1]);
    }
}
