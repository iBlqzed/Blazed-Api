import { world, Player as IPlayer } from "mojang-minecraft"
import { Player, Entity } from "../Entity/index.js"
import { Item } from "../Item/index.js"
import { Events } from "../Types/index.js"

export class ItemUse {
    /**
     * The actual arg
     */
    protected arg: any = undefined
    /**
     * Add a listener for the event
     */
    on(callback: (data: Events['ItemUse']) => void): ItemUse {
        this.arg = world.events.beforeItemUse.subscribe(data => {
            callback({
                entity: data.source.id === 'minecraft:player' ? new Player(data.source as IPlayer) : new Entity(data.source),
                item: new Item(data.item),
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
        world.events.beforeItemUse.unsubscribe(this.arg)
    }
}