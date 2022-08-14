import { world, Player as IPlayer } from "mojang-minecraft"
import { Player, Entity } from "../Entity/index"
import { Events } from "../Types/index"

export class BlockHit {
    /**
     * The actual arg
     */
    protected arg: any = undefined
    /**
     * Add a listener for the event
     */
    on(callback: (data: Events['BlockHit']) => void): BlockHit {
        this.arg = world.events.entityHit.subscribe(data => {
            if (data.hitBlock) callback({
                entity: data.entity.id === 'minecraft:player' ? new Player(data.entity as IPlayer) : new Entity(data.entity),
                hitBlock: data.hitBlock
            })
        })
        return this
    }
    /**
     * Remove the listener for the event
     */
    off(): void {
        world.events.entityHit.unsubscribe(this.arg)
    }
}