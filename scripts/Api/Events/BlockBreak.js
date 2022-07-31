import { world } from "mojang-minecraft";
import { Player } from "../Entity/index.js";
import { setTickTimeout } from "../utils.js";
let arg;
export class BlockBreak {
    /**
     * Add a listener for the event
     */
    static on(callback) {
        if (this.registered)
            return;
        this.registered = true;
        arg = world.events.blockBreak.subscribe(({ player, block, brokenBlockPermutation }) => {
            callback({
                player: new Player(player),
                block: block,
                brokenBlockPermutation: brokenBlockPermutation,
                cancel() {
                    player.dimension.getBlock(block.location).setPermutation(brokenBlockPermutation);
                    setTickTimeout(() => player.dimension.getEntitiesAtBlockLocation(block.location).filter(entity => entity.id === 'minecraft:item').forEach(item => item.kill()), 0);
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
        world.events.blockBreak.unsubscribe(arg);
        this.registered = false;
    }
}
/**
 * Whether or not the event has been registered
 */
BlockBreak.registered = false;
