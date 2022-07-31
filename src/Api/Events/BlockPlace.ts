import { world } from "mojang-minecraft"
import { Player } from "../Entity/index.js"
import { Events } from "../Types/index.js"
import { setTickTimeout } from "../utils.js"

let arg: any

export class BlockPlace {
    /**
     * Whether or not the event has been registered
     */
    static registered = false
    /**
     * Add a listener for the event
     */
    static on(callback: (data: Events['BlockPlace']) => void): void {
        if (this.registered) return
        this.registered = true
        arg = world.events.blockPlace.subscribe(({ player, block }) => {
            callback({
                player: new Player(player),
                block: block
            })
        })
    }
    /**
     * Remove the listener for the event
     */
    static off(): void {
        if (!this.registered) return
        world.events.blockPlace.unsubscribe(arg)
        this.registered = false
    }
}