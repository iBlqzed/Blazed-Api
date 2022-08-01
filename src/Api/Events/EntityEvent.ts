import { world } from "mojang-minecraft"
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
    static on(callback: (data: Events['EntityEvent']) => void): void {
        if (this.registered) return
        this.registered = true
        arg = world.events.beforeDataDrivenEntityTriggerEvent.subscribe(data => {
            callback({
                entity: new Entity(data.entity),
                modifiers: data.modifiers,
                id: data.id,
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
        world.events.beforeDataDrivenEntityTriggerEvent.unsubscribe(arg)
        this.registered = false
    }
}