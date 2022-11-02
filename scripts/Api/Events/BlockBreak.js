import { world } from "@minecraft/server";
import { Player } from "../Entity/index.js";
import { Block } from "../Block/index.js";
export class BlockBreak {
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
        this.arg = world.events.blockBreak.subscribe(({ player, block, brokenBlockPermutation }) => {
            callback({
                player: new Player(player),
                block: new Block(block),
                brokenBlockPermutation,
                cancel() {
                    player.dimension.getBlock(block.location).setPermutation(brokenBlockPermutation);
                    const e = world.events.tick.subscribe(() => {
                        world.events.tick.unsubscribe(e);
                        player.dimension.getEntitiesAtBlockLocation(block.location).filter(entity => entity.typeId === 'minecraft:item').forEach(item => item.kill());
                    });
                }
            });
        });
        return this;
    }
    /**
     * Remove the listener for the event
     */
    off() {
        world.events.blockBreak.unsubscribe(this.arg);
    }
}
