import { Dimension } from "../World/index";
export class Block {
    constructor(block) {
        this.block = block;
        this.id = block.id;
        this.dimension = new Dimension(block.dimension);
        this.type = block.type;
    }
    /**
     * Get a component from the block
     * @param {string} comp The component to get
     * @returns {any} The component
     */
    getComponent(comp) {
        return this.block.getComponent(comp);
    }
    /**
     * Get all the block's tags
     * @returns {string[]} All the block's tags
     */
    getTags() {
        return this.block.getTags();
    }
    hasTag(tag) {
        return this.block.hasTag(tag);
    }
    isEmpty() {
        return this.block.isEmpty;
    }
    get waterLogged() {
        return this.block.isWaterlogged;
    }
    set waterLogged(waterLogged) {
        this.block.isWaterlogged = waterLogged;
    }
}
