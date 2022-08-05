import { world } from "mojang-minecraft"
import { Events } from "../Types/index.js"

let arg: any

export class Tick {
    /**
     * Whether or not the event has been registered
     */
    static registered = false
    /**
     * Add a listener for the event
     */
    static on(callback: (data: Events['Tick']) => void): void {
        if (this.registered) return
        this.registered = true
        arg = world.events.tick.subscribe(data => {
            callback()
        })
    }
    /**
     * Remove the listener for the event
     */
    static off(): void {
        if (!this.registered) return
        world.events.tick.unsubscribe(arg)
        this.registered = false
    }
}