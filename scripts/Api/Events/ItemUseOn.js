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
        const log = {};
        arg = world.events.beforeItemUseOn.subscribe(data => {
            if (data.source.id === "minecraft:player") {
                const oldLog = log[data.source.name] ?? Date.now() - 102;
                log[data.source.name] = Date.now();
                if ((oldLog + 100) < Date.now())
                    callback({
                        entity: new Player(data.source),
                        item: new Item(data.item),
                        block: data.source.dimension.getBlock(data.blockLocation),
                        cancel() {
                            data.cancel = true;
                        }
                    });
            }
            else
                callback({
                    entity: new Entity(data.source),
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
