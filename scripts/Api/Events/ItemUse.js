import { world } from "mojang-minecraft";
import { Player, Entity } from "../Entity/index.js";
import { Item } from "../Item/index.js";
let arg;
export class ItemUse {
    /**
     * Add a listener for the event
     */
    static on(callback) {
        if (this.registered)
            return;
        this.registered = true;
        arg = world.events.beforeItemUse.subscribe(data => {
            callback({
                entity: data.source.id === 'minecraft:player' ? new Player(data.source) : new Entity(data.source),
                item: new Item(data.item),
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
        world.events.beforeItemUse.unsubscribe(arg);
        this.registered = false;
    }
}
/**
 * Whether or not the event has been registered
 */
ItemUse.registered = false;
