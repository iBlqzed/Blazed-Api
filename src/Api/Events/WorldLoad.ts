import { world } from "mojang-minecraft"
import { Events } from "../Types/index"
import { World } from "../World/index.js"

export class WorldLoad {
    /**
     * The actual arg
     */
    protected arg: any = undefined
    /**
     * Add a listener for the event
     */
    on(callback: (data: Events['WorldLoad']) => void): WorldLoad {
        this.arg = world.events.tick.subscribe(() => {
            try {
                world.getDimension('overworld').runCommand(`testfor @a`)
                callback(new World())
                world.events.tick.unsubscribe(this.arg)
            } catch { }
        })
        return this
    }
    /**
     * Remove the listener for the event
     */
    off(): void {
        try { world.events.entityHit.unsubscribe(this.arg) } catch { }
    }
}