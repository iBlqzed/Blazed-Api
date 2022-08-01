import { world, Player as IPlayer } from "mojang-minecraft"
import { Player, Entity } from "../Entity/index"
import { Events } from "../Types/index"

let arg: any

export class BlockHit {
    /**
     * Whether or not the event has been registered
     */
    static registered = false
    /**
     * Add a listener for the event
     */
    static on(callback: (data: Events['BlockHit']) => void): void {
        if (this.registered) return
        this.registered = true
        arg = world.events.entityHit.subscribe(data => {
            if (data.hitBlock) callback({
                entity: data.entity.id === 'minecraft:player' ? new Player(data.entity as IPlayer) : new Entity(data.entity),
                hitBlock: data.hitBlock
            })
        })
    }
    /**
     * Remove the listener for the event
     */
    static off(): void {
        if (!this.registered) return
        world.events.entityHit.unsubscribe(arg)
        this.registered = false
    }
}