import { world } from "mojang-minecraft"
import { Entity } from "../Entity/index.js"
import { Events } from "../Types/index.js"

export class EntityEvent {
    /**
     * The actual arg
     */
    protected arg: any = undefined
    /**
     * Add a listener for the event
     */
    on(callback: (data: Events['EntityEvent']) => void): EntityEvent {
        this.arg = world.events.beforeDataDrivenEntityTriggerEvent.subscribe(data => {
            callback({
                entity: new Entity(data.entity),
                modifiers: data.modifiers,
                id: data.id,
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
        world.events.beforeDataDrivenEntityTriggerEvent.unsubscribe(this.arg)
    }
}