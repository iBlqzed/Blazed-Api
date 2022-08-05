import { EntityHealthComponent, world } from "mojang-minecraft"
import { Entity } from "../Entity/index.js"
import { Events } from "../Types/index.js"

let arg: any

export class EntityEvent {
    /**
     * Whether or not the event has been registered
     */
    static registered = false
    /**
     * Add a listener for the event
     */
    static on(callback: (data: any) => void): void {
        if (this.registered) return
        this.registered = true
        const deadPlayers = [] as string[]
    }
    /**
     * Remove the listener for the event
     */
    static off(): void {
        if (!this.registered) return
        world.events.tick.unsubscribe(arg)
        this.registered = false
    }
}