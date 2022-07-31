import { world } from "mojang-minecraft"
import { Player } from "../Entity/index.js"
import { Events } from "../Types/index.js"

let arg: any

export class PlayerJoin {
    /**
     * Whether or not the event has been registered
     */
    static registered = false
    /**
     * Add a listener for the event
     */
    static on(callback: (data: Events['PlayerJoin']) => void): void {
        if (this.registered) return
        this.registered = true
        arg = world.events.playerJoin.subscribe(data => callback(new Player(data.player)))
    }
    /**
     * Remove the listener for the event
     */
    static off(): void {
        if (!this.registered) return
        world.events.playerJoin.unsubscribe(arg)
        this.registered = false
    }
}