import { world } from "mojang-minecraft"
import { Events } from "../Types/index.js"

let arg: any

export class PlayerLeave {
    /**
     * Whether or not the event has been registered
     */
    static registered = false
    /**
     * Add a listener for the event
     */
    static on(callback: (data: Events['PlayerLeave']) => void): void {
        if (this.registered) return
        this.registered = true
        arg = world.events.playerLeave.subscribe(data => callback(data.playerName))
    }
    /**
     * Remove the listener for the event
     */
    static off(): void {
        if (!this.registered) return
        world.events.playerLeave.unsubscribe(arg)
        this.registered = false
    }
}