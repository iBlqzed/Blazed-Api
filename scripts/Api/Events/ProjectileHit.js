import { world } from "@minecraft/server";
import { Block } from "../Block/index";
import { Player, Entity } from "../Entity/index";
export class ProjectileHit {
    constructor() {
        /**
         * The actual arg
         */
        this.arg = undefined;
    }
    /**
     * Add a listener for the event
     */
    on(callback) {
        this.arg = world.events.projectileHit.subscribe(({ source, entityHit, blockHit, projectile, hitVector, location }) => {
            const e = world.events.tick.subscribe(() => {
                world.events.tick.unsubscribe(e);
                callback({
                    entity: source.typeId === 'minecraft:player' ? new Player(source) : new Entity(source),
                    hitEntity: entityHit?.entity ? entityHit.entity.typeId === 'minecraft:player' ? new Player(entityHit.entity) : new Entity(entityHit.entity) : undefined,
                    hitBlock: blockHit?.block ? {
                        block: new Block(blockHit.block),
                        face: blockHit.face,
                        faceLocationX: blockHit.faceLocationX,
                        faceLocationY: blockHit.faceLocationY
                    } : undefined,
                    projectile: new Entity(projectile),
                    hitVector: hitVector,
                    location: location
                });
            });
        });
        return this;
    }
    /**
     * Remove the listener for the event
     */
    off() {
        world.events.entityHit.unsubscribe(this.arg);
    }
}
