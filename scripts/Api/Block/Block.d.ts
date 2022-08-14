import type { Block as IBlock, BlockLocation, BlockPermutation, BlockType } from "mojang-minecraft";
import { Dimension } from "../World/index";
export declare class Block {
    protected readonly block: IBlock;
    /**
     * The dimension of the block
     */
    readonly dimension: Dimension;
    /**
     * The block id
     */
    readonly id: string;
    /**
     * The block's location
     */
    readonly location: BlockLocation;
    /**
     * The block type
     */
    readonly type: BlockType;
    /**
     * The block permutation
     */
    readonly permutation: BlockPermutation;
    constructor(block: IBlock);
    /**
     * Get a component from the block
     * @param {string} comp The component to get
     * @returns {any} The component
     */
    getComponent(comp: string): any;
    /**
     * Get all the block's tags
     * @returns {string[]} All the block's tags
     */
    getTags(): string[];
    hasTag(tag: string): boolean;
    isEmpty(): boolean;
    get waterLogged(): boolean;
    set waterLogged(waterLogged: boolean);
}
