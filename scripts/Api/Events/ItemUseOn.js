import { world } from "mojang-minecraft";
import { Player, Entity } from "../Entity/index.js";
import { Item } from "../Item/index.js";
export class ItemUseOn {
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
        const log = {};
        this.arg = world.events.beforeItemUseOn.subscribe(data => {
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
        return this;
    }
    /**
     * Remove the listener for the event
     */
    off() {
        world.events.beforeItemUseOn.unsubscribe(this.arg);
    }
}
