import { world } from "mojang-minecraft"
import { Events } from "../Types/index"
import { World } from "../World/index.js"

let arg: any

export class WorldLoad {
    /**
     * Whether or not the event has been registered
     */
    static registered = false
    /**
     * Add a listener for the event
     */
    static on(callback: (data: Events['WorldLoad']) => void): void {
        if (this.registered) return
        this.registered = true
        arg = world.events.tick.subscribe(data => {
            try {
                world.getDimension('overworld').runCommand(`testfor @a`)
                world.events.tick.unsubscribe(arg)
                callback(new World())
            } catch { }
        })
    }
    /**
     * Remove the listener for the event
     */
    static off(): void {
        if (!this.registered) return
        try { world.events.entityHit.unsubscribe(arg) } catch { }
        this.registered = false
    }
}