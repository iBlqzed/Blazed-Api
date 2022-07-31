import { world } from "mojang-minecraft"
import { Player } from "../Entity/index.js"
import { Events } from "../Types/index.js"
import { setTickTimeout } from "../utils.js"

let arg: any

export class BlockBreak {
    /**
     * Whether or not the event has been registered
     */
    static registered = false
    /**
     * Add a listener for the event
     */
    static on(callback: (data: Events['BlockBreak']) => void): void {
        if (this.registered) return
        this.registered = true
        arg = world.events.blockBreak.subscribe(({ player, block, brokenBlockPermutation }) => {
            callback({
                player: new Player(player),
                block: block,
                brokenBlockPermutation: brokenBlockPermutation,
                cancel(): void {
                    player.dimension.getBlock(block.location).setPermutation(brokenBlockPermutation)
                    setTickTimeout(() => player.dimension.getEntitiesAtBlockLocation(block.location).filter(entity => entity.id === 'minecraft:item').forEach(item => item.kill()), 0)
                }
            })
        })
    }
    /**
     * Remove the listener for the event
     */
    static off(): void {
        if (!this.registered) return
        world.events.blockBreak.unsubscribe(arg)
        this.registered = false
    }
}