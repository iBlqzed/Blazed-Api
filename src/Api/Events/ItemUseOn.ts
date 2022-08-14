import { world, Player as IPlayer } from "mojang-minecraft"
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
        const log: { [key: string]: number } = {}
        this.arg = world.events.beforeItemUseOn.subscribe(data => {
            if (data.source.id === "minecraft:player") {
                const oldLog = log[(data.source as IPlayer).name] ?? Date.now() - 102
                log[(data.source as IPlayer).name] = Date.now()
                if ((oldLog + 100) < Date.now()) callback({
                    entity: new Player(data.source as IPlayer),
                    item: new Item(data.item),
                    block: data.source.dimension.getBlock(data.blockLocation),
                    cancel(): void {
                        data.cancel = true
                    }
                })
            } else callback({
                entity: new Entity(data.source),
                item: new Item(data.item),
                block: data.source.dimension.getBlock(data.blockLocation),
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