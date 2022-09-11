import { world, Player as IPlayer } from "mojang-minecraft"
import { Block } from "../Block/index.js"
import { Player, Entity } from "../Entity/index.js"
import { Item } from "../Item/index.js"
import { Events } from "../Types/index.js"

export class ItemUseOn {
    /**
     * The actual arg
     */
    protected arg: any = undefined
    /**
     * Add a listener for the event
     */
    on(callback: (data: Events['ItemUseOn']) => void): ItemUseOn {
        this.arg = world.events.beforeItemUseOn.subscribe(data => {
            callback({
                entity: data.source.id === "minecraft:player" ? new Player(data.source as IPlayer) : new Entity(data.source),
                item: new Item(data.item),
                block: new Block(data.source.dimension.getBlock(data.blockLocation)),
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
        world.events.beforeItemUseOn.unsubscribe(this.arg)
    }
}

/**
const oldLog = log[(data.source as IPlayer).name] ?? Date.now() - 102
log[(data.source as IPlayer).nam[e] = Date.now()
if ((oldLog + 100) < Date.now())]
 */