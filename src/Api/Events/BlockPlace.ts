import { world } from "@minecraft/server"
import { Block } from "../Block/index.js"
import { Player } from "../Entity/index.js"
import { Events } from "../Types/index.js"

export class BlockPlace {
    /**
     * The actual arg
     */
    protected arg: any = undefined
    /**
     * Add a listener for the event
     */
    on(callback: (data: Events['BlockPlace']) => void): BlockPlace {
        this.arg = world.events.blockPlace.subscribe(({ player, block }) => {
            callback({
                player: new Player(player),
                block: new Block(block)
            })
        })
        return this
    }
    /**
     * Remove the listener for the event
     */
    off(): void {
        world.events.blockPlace.unsubscribe(this.arg)
    }
}