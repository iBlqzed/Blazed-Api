import { world } from "mojang-minecraft";
import { Player, Entity } from "../Entity/index";
let arg;
export class EntityHit {
    /**
     * Add a listener for the event
     */
    static on(callback) {
        if (this.registered)
            return;
        this.registered = true;
        arg = world.events.entityHit.subscribe(data => {
            callback({
                entity: data.entity.id === 'minecraft:player' ? new Player(data.entity) : new Entity(data.entity),
                hitBlock: data.hitBlock,
                hitEntity: data.hitEntity.id === 'minecraft:player' ? new Player(data.hitEntity) : new Entity(data.hitEntity)
            });
        });
    }
    /**
     * Remove the listener for the event
     */
    static off() {
        if (!this.registered)
            return;
        world.events.entityHit.unsubscribe(arg);
        this.registered = false;
    }
}
/**
 * Whether or not the event has been registered
 */
EntityHit.registered = false;
