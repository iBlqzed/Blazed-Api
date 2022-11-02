import { world, Player as IPlayer } from "@minecraft/server"
import { Block } from "../Block/index"
import { Player, Entity } from "../Entity/index"
import { Events } from "../Types/index"

export class ProjectileHit {
    /**
     * The actual arg
     */
    protected arg: any = undefined
    /**
     * Add a listener for the event
     */
    on(callback: (data: Events['ProjectileHit']) => void): ProjectileHit {
        this.arg = world.events.projectileHit.subscribe(({ source, entityHit, blockHit, projectile, hitVector, location }) => {
            const e = world.events.tick.subscribe(() => {
                world.events.tick.unsubscribe(e)
                callback({
                    entity: source.typeId === 'minecraft:player' ? new Player(source as IPlayer) : new Entity(source),
                    hitEntity: entityHit?.entity ? entityHit.entity.typeId === 'minecraft:player' ? new Player(entityHit.entity as IPlayer) : new Entity(entityHit.entity) : undefined,
                    hitBlock: blockHit?.block ? {
                        block: new Block(blockHit.block),
                        face: blockHit.face,
                        faceLocationX: blockHit.faceLocationX,
                        faceLocationY: blockHit.faceLocationY
                    } : undefined,
                    projectile: new Entity(projectile),
                    hitVector: hitVector,
                    location: location
                })
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