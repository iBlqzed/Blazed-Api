import { world } from "@minecraft/server";
import { Player, Entity } from "../Entity/index";
export class EntityHit {
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
        this.arg = world.events.entityHit.subscribe(data => {
            if (data.hitEntity)
                callback({
                    entity: data.entity.typeId === 'minecraft:player' ? new Player(data.entity) : new Entity(data.entity),
                    hitEntity: data.hitEntity.typeId === 'minecraft:player' ? new Player(data.hitEntity) : new Entity(data.hitEntity)
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
