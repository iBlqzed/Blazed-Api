import { world, Player as IPlayer } from "mojang-minecraft"
import { Player, Entity } from "../Entity/index.js"
import { Item } from "../Item/index.js"
import { Events } from "../Types/index.js"

let arg: any

export class ItemUse {
    /**
     * Whether or not the event has been registered
     */
    static registered = false
    /**
     * Add a listener for the event
     */
    static on(callback: (data: Events['ItemUse']) => void): void {
        if (this.registered) return
        this.registered = true
        arg = world.events.beforeItemUse.subscribe(data => {
            callback({
                entity: data.source.id === 'minecraft:player' ? new Player(data.source as IPlayer) : new Entity(data.source),
                item: new Item(data.item),
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
        world.events.beforeItemUse.unsubscribe(arg)
        this.registered = false
    }
}