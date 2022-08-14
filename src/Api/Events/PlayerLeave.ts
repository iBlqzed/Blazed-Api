import { world } from "mojang-minecraft"
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
        this.arg = world.events.playerLeave.subscribe(data => callback(data.playerName))
        return this
    }
    /**
     * Remove the listener for the event
     */
    off(): void {
        world.events.playerLeave.unsubscribe(this.arg)
    }
}