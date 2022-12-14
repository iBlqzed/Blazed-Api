import { Player as IPlayer, world } from "@minecraft/server"
import { Entity } from "../Entity/index.js"
import { Events } from "../Types/index.js"
import { Player } from "../Entity/index.js"

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
                entity: data.entity.typeId === 'minecraft:player' ? new Player(data.entity as IPlayer) : new Entity(data.entity),
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