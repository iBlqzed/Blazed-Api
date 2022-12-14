import { world, Player as IPlayer } from "@minecraft/server"
import { Block } from "../Block/index.js"
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
                entity: data.entity.typeId === 'minecraft:player' ? new Player(data.entity as IPlayer) : new Entity(data.entity),
                hitBlock: new Block(data.hitBlock)
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