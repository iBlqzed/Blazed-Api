import { world } from "mojang-minecraft"
import { Player } from "../Entity/index.js"
import { Events } from "../Types/index.js"

export class PlayerJoin {
    /**
     * The actual arg
     */
    protected arg: any = undefined
    /**
     * Add a listener for the event
     */
    on(callback: (data: Events['PlayerJoin']) => void): PlayerJoin {
        this.arg = world.events.playerJoin.subscribe(data => {
            callback(new Player(data.player))
        })
        return this
    }
    /**
     * Remove the listener for the event
     */
    off(): void {
        world.events.playerJoin.unsubscribe(this.arg)
    }
}