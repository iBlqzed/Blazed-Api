import { world } from "mojang-minecraft";
import { Player, Entity } from "../Entity/index.js";
import { Item } from "../Item/index.js";
let arg;
export class ItemUseOn {
    /**
     * Add a listener for the event
     */
    static on(callback) {
        if (this.registered)
            return;
        this.registered = true;
        arg = world.events.beforeItemUseOn.subscribe(data => {
            callback({
                entity: data.source.id === 'minecraft:player' ? new Player(data.source) : new Entity(data.source),
                item: new Item(data.item),
                block: data.source.dimension.getBlock(data.blockLocation),
                cancel() {
                    data.cancel = true;
                }
            });
        });
    }
    /**
     * Remove the listener for the event
     */
    static off() {
        if (!this.registered)
            return;
        world.events.beforeItemUseOn.unsubscribe(arg);
        this.registered = false;
    }
}
/**
 * Whether or not the event has been registered
 */
ItemUseOn.registered = false;
