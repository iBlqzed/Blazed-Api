import { world } from "mojang-minecraft"
import { Player } from "../Entity/index"
import { Events } from "../Types/index"

export class Chat {
    /**
     * The actual arg
     */
    protected arg: any = undefined
    /**
     * Add a listener for the event
     */
    on(callback: (data: Events['Chat']) => void): Chat {
        this.arg = world.events.beforeChat.subscribe(data => {
            callback({
                player: new Player(data.sender),
                message: data.message,
                cancel(): void {
                    data.cancel = true
                }
            })
        })
        return this
    }
    /**
     * Remove the listener for the event
     */
    off(): void {
        world.events.beforeChat.unsubscribe(this.arg)
    }
}