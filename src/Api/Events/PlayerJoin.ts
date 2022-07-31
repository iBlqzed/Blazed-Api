import { world } from "mojang-minecraft"
import { Player } from "../Entity/index.js"
import { Events } from "../Types/index.js"
import { clearTickTimeout, setTickTimeout } from "../utils.js"

let arg: any

export class PlayerJoin {
    /**
     * Whether or not the event has been registered
     */
    static registered = false
    /**
     * Add a listener for the event
     */
    static on(callback: (data: Events['PlayerJoin']) => void): void {
        if (this.registered) return
        this.registered = true
        arg = world.events.playerJoin.subscribe(data => {
            const player = data.player
            const timeout = setTickTimeout(() => {
                const plr = [...world.getPlayers()].find(plr => plr.name === player.name)
                if (plr) {
                    callback(new Player(plr))
                    clearTickTimeout(timeout)
                }
            }, 1, true)
        })
    }
    /**
     * Remove the listener for the event
     */
    static off(): void {
        if (!this.registered) return
        world.events.playerJoin.unsubscribe(arg)
        this.registered = false
    }
}