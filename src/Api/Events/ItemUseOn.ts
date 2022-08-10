import { world, Player as IPlayer } from "mojang-minecraft"
import { Player, Entity } from "../Entity/index.js"
import { Item } from "../Item/index.js"
import { Events } from "../Types/index.js"

let arg: any

export class ItemUseOn {
    /**
     * Whether or not the event has been registered
     */
    static registered = false
    /**
     * Add a listener for the event
     */
    static on(callback: (data: Events['ItemUseOn']) => void): void {
        if (this.registered) return
        this.registered = true
        const log: { [key: string]: number } = {}
        arg = world.events.beforeItemUseOn.subscribe(data => {
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
    }
    /**
     * Remove the listener for the event
     */
    static off(): void {
        if (!this.registered) return
        world.events.beforeItemUseOn.unsubscribe(arg)
        this.registered = false
    }
}