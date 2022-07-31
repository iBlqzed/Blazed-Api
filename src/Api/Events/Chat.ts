import { world } from "mojang-minecraft"
import { Player } from "../Entity/index"
import { Events } from "../Types/index"

let arg: any

export class Chat {
    /**
     * Whether or not the event has been registered
     */
    static registered = false
    /**
     * Add a listener for the event
     */
    static on(callback: (data: Events['Chat']) => void): void {
        if (this.registered) return
        this.registered = true
        arg = world.events.beforeChat.subscribe(data => {
            callback({
                player: new Player(data.sender),
                message: data.message,
                cancel(): void {
                    data.cancel = true
                }
            })
        })
    }
    /**
     * Remove the listener for the event
     */
    static off(): void {
        if (!this.registered) return
        world.events.beforeChat.unsubscribe(arg)
        this.registered = false
    }
}