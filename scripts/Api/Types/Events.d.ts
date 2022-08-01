import { Block, BlockPermutation, DefinitionModifier } from "mojang-minecraft";
import { Player, Entity } from "../Entity/index.js";
import { Item } from "../Item/index.js";
export declare type Events = {
    BlockBreak: {
        /**
         * The player that broke the block
         */
        player: Player;
        /**
         * The block that was broken
         */
        block: Block;
        /**
         * The broken block permutation
         */
        brokenBlockPermutation: BlockPermutation;
        /**
         * Cancel the event
         */
        cancel(): void;
    };
    BlockPlace: {
        /**
         * Player that placed the block
         */
        player: Player;
        /**
         * Block that was placed
         */
        block: Block;
    };
    Chat: {
        /**
         * The player that chatted
         */
        player: Player;
        /**
         * The message that was sent
         */
        message: string;
        /**
         * Cancel the event
         */
        cancel(): void;
    };
    EntityEvent: {
        /**
         * The entity in this event
         */
        entity: Entity;
        /**
         * The id of the event
         */
        id: string;
        /**
         * The event modifiers
         */
        modifiers: DefinitionModifier[];
        /**
         * Cancel the event
         */
        cancel(): void;
    };
    EntityHit: {
        /**
         * The entity that hit something
         */
        entity: Entity | Player;
        /**
         * The entity that may have been hit
         */
        hitEntity?: Entity | Player;
        /**
         * The block that may have been hit
         */
        hitBlock?: Block;
    };
    ItemUse: {
        /**
         * Entity that used the item
         */
        entity: Entity | Player;
        /**
         * Item that was used
         */
        item: Item;
        /**
         * Cancel the event
         */
        cancel(): void;
    };
    ItemUseOn: {
        /**
         * Entity that used the item
         */
        entity: Entity | Player;
        /**
         * Item that was used
         */
        item: Item;
        /**
         * The block that was clicked one
         */
        block: Block;
        /**
         * Cancel the event
         */
        cancel(): void;
    };
    /**
     * The player that joined
     */
    PlayerJoin: Player;
};
