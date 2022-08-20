import { world } from "mojang-minecraft"
import { Commands } from "../Commands/index"
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
            const { message } = data
            if (Commands.clients.find(e => message.startsWith(e.command?.prefix))) return
            callback({
                player: new Player(data.sender),
                message: message,
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