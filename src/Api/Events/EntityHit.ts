import { world, Player as IPlayer } from "mojang-minecraft"
import { Player, Entity } from "../Entity/index"
import { Events } from "../Types/index"

export class EntityHit {
    /**
     * The actual arg
     */
    protected arg: any = undefined
    /**
     * Add a listener for the event
     */
    on(callback: (data: Events['EntityHit']) => void): EntityHit {
        this.arg = world.events.entityHit.subscribe(data => {
            if (data.hitEntity) callback({
                entity: data.entity.id === 'minecraft:player' ? new Player(data.entity as IPlayer) : new Entity(data.entity),
                hitEntity: data.hitEntity.id === 'minecraft:player' ? new Player(data.hitEntity as IPlayer) : new Entity(data.hitEntity)
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