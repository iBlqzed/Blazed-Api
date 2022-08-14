import { world } from "mojang-minecraft"
import { Events } from "../Types/index.js"

export class Tick {
    /**
     * The actual arg
     */
    protected arg: any = undefined
    /**
     * Add a listener for the event
     */
    on(callback: (data: Events['Tick']) => void): Tick {
        this.arg = world.events.tick.subscribe(data => {
            callback()
        })
        return this
    }
    /**
     * Remove the listener for the event
     */
    off(): void {
        world.events.tick.unsubscribe(this.arg)
    }
}