import { system, world } from "@minecraft/server"
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
        this.arg = true
        system.run(() => {
            if (this.arg) callback(new World())
        })
        return this
    }
    /**
     * Remove the listener for the event
     */
    off(): void {
        this.arg = false
    }
}