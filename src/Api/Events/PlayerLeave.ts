import { world } from "@minecraft/server"
import { PlayerLog } from "../Entity/Entity.js"
import { Events } from "../Types/index.js"

export class PlayerLeave {
    /**
     * The actual arg
     */
    protected arg: any = undefined
    /**
     * Add a listener for the event
     */
    on(callback: (data: Events['PlayerLeave']) => void): PlayerLeave {
        this.arg = world.events.playerLeave.subscribe(({ playerName }) => callback({ playerName, log: new PlayerLog(playerName) }))
        return this
    }
    /**
     * Remove the listener for the event
     */
    off(): void {
        world.events.playerLeave.unsubscribe(this.arg)
    }
}