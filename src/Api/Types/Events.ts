import { Block, BlockPermutation } from "mojang-minecraft"
import { Player, Entity } from "../Entity/index.js"
import { Item } from "../Item/index.js"

export type Events = {
    BlockBreak: {
        /**
         * The player that broke the block
         */
        player: Player,
        /**
         * The block that was broken
         */
        block: Block,
        /**
         * The broken block permutation
         */
        brokenBlockPermutation: BlockPermutation,
        /**
         * Cancel the event
         */
        cancel(): void
    }
    Chat: {
        /**
         * The player that chatted
         */
        player: Player,
        /**
         * The message that was sent
         */
        message: string,
        /**
         * Cancel the event
         */
        cancel(): void
    }
    BlockPlace: {
        /**
         * Player that placed the block
         */
        player: Player
        /**
         * Block that was placed
         */
        block: Block
    }
    ItemUse: {
        /**
         * Entity that used the item
         */
        entity: Entity | Player
        /**
         * Item that was used
         */
        item: Item
        /**
         * Cancel the event
         */
        cancel(): void
    }
    /**
     * The player that joined
     */
    PlayerJoin: Player
    ItemUseOn: {
        /**
         * Entity that used the item
         */
        entity: Entity | Player
        /**
         * Item that was used
         */
        item: Item
        /**
         * The block that was clicked one
         */
        block: Block
        /**
         * Cancel the event
         */
        cancel(): void
    }
}