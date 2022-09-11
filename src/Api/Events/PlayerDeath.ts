import { EntityHealthComponent, world } from "mojang-minecraft"
import { Player } from "../Entity/index.js"
import { Events } from "../Types/index.js"

export class PlayerDeath {
    /**
     * The actual arg
     */
    protected args: any[] = []
    /**
     * Add a listener for the event
     */
    on(callback: (data: Events['PlayerDeath']) => void): PlayerDeath {
        const deadPlayers = new Set<string>()
        this.args.push(world.events.tick.subscribe(() => {
            for (const a of world.getPlayers()) {
                if ((<EntityHealthComponent>a.getComponent("health")).current <= 0 && !deadPlayers.has(a.name)) {
                    callback(new Player(a))
                    deadPlayers.add(a.name)
                }
                if (deadPlayers.has(a.name) && (<EntityHealthComponent>a.getComponent("health")).current > 0) deadPlayers.delete(a.name)
            }
        }), world.events.playerLeave.subscribe(({ playerName }) => {
            deadPlayers.delete(playerName)
        }))
        return this
    }
    /**
     * Remove the listener for the event
     */
    off(): void {
        world.events.tick.unsubscribe(this.args[0])
        world.events.playerLeave.unsubscribe(this.args[1])
    }
}