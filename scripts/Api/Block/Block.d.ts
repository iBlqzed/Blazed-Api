import type { Block as IBlock, BlockLocation, BlockType } from "mojang-minecraft";
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
    constructor(block: IBlock);
}
