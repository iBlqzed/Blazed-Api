import { Block as IBlock, BlockLocation, BlockPermutation, BlockType, Location } from "mojang-minecraft"
import { locationFunctions } from "../utils"
import { Dimension } from "../World/index"

export class Block {
    protected readonly block: IBlock
    constructor(block: IBlock) {
        this.block = block
    }
    /**
     * Get the block's block location
     * @returns {BlockLocation} The block's block location
     */
    getBlockLocation(): BlockLocation {
        return this.block.location
    }
    /**
     * Get a block component
     * @param {string} comp The component to get
     * @returns {any} The component
     */
    getComponent(comp: string): any {
        return this.block.getComponent(comp)
    }
    /**
     * Get the block's dimension
     * @returns {Dimension} The block's dimension
     */
    getDimension(): Dimension {
        return new Dimension(this.block.dimension)
    }
    /**
     * Get the block's id
     * @returns {string} The block's id
     */
    getId(): string {
        return this.block.id
    }
    /**
     * Get the block's location
     * @returns {Location} The block's location
     */
    getLocation(): Location {
        return locationFunctions.blockLocationToLocation(this.block.location)
    }
    /**
     * Get the block's permutation
     * @returns {BlockPermutation} The block's permutation
     */
    getPermutation(): BlockPermutation {
        return this.block.permutation
    }
    /**
     * Get all the block's tags
     * @returns {string[]} All the block's tags
     */
    getTags(): string[] {
        return this.block.getTags()
    }
    /**
     * Get the block's type
     * @returns {BlockType} The block's type
     */
    getType(): BlockType {
        return this.block.type
    }
    /**
     * Test for whether or not the block has a certain tag
     * @param {string} tag Tag to test for
     * @returns {boolean} Whether or not the block has the tag
     */
    hasTag(tag: string): boolean {
        return this.block.hasTag(tag)
    }
    /**
     * Test for whether or not the block is empty (air)
     * @returns {boolean} Whether or not the block is empty
     */
    isEmpty(): boolean {
        return this.block.isEmpty
    }
    /**
     * Test for whether or not the block is waterlogged
     * @returns {boolean} Whether or not the block is waterlogged
     */
    isWaterLogged(): boolean {
        return this.block.isWaterlogged
    }
    /**
     * Set the block's permutation
     * @param {BlockPermutation} permutation Permutation to set the block to
     */
    setPermutation(permutation: BlockPermutation): void {
        this.block.setPermutation(permutation)
    }
    /**
     * Set the block's type
     * @param {BlockType} type Type to set the block to
     */
    setType(type: BlockType): void {
        this.block.setType(type)
    }
}