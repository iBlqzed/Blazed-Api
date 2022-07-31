import { Dimension } from "../World/index";
export class Block {
    constructor(block) {
        this.block = block;
        this.id = block.id;
        this.dimension = new Dimension(block.dimension);
        this.type = block.type;
    }
}
