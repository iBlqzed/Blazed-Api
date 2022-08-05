import type { Block as IBlock, BlockLocation, BlockPermutation, BlockType } from "mojang-minecraft"
import { Dimension } from "../World/index"

export class Block {
    protected readonly block: IBlock
    /**
     * The dimension of the block
     */
    readonly dimension: Dimension
    /**
     * The block id
     */
    readonly id: string
    /**
     * The block's location
     */
    readonly location: BlockLocation
    /**
     * The block type
     */
    readonly type: BlockType
    /**
     * The block permutation
     */
    readonly permutation: BlockPermutation
    constructor(block: IBlock) {
        this.block = block
        this.id = block.id
        this.dimension = new Dimension(block.dimension)
        this.type = block.type
    }
    /**
     * Get a component from the block
     * @param {string} comp The component to get
     * @returns {any} The component
     */
    getComponent(comp: string): any {
        return this.block.getComponent(comp)
    }
    /**
     * 
     * @returns {string[]} All the block's tags
     */
    getTags(): string[] {
        return this.block.getTags()
    }
    hasTag(tag: string): boolean {
        return this.block.hasTag(tag)
    }
    isEmpty(): boolean {
        return this.block.isEmpty
    }
    get waterLogged(): boolean {
        return this.block.isWaterlogged
    }
    set waterLogged(waterLogged: boolean) {
        this.block.isWaterlogged = waterLogged
    }
}