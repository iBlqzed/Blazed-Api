import type { Block, BlockInventoryComponent } from "mojang-minecraft";
import { Item } from "../Item/Item.js";
import { EntityInventory } from "./EntityInventory";

/**
 * An entity's inventory
 */
export class BlockInventory {
    protected readonly _inventory: BlockInventoryComponent
    /**
     * The id of the inventory (should always be "minecraft:inventory")
     */
    readonly id: string
    /**
     * The size of the inventory
     */
    readonly size: number
    constructor(block: Block) {
        const inventory = block.getComponent('inventory') as BlockInventoryComponent
        this._inventory = inventory
        this.id = 'minecraft:inventory'
        this.size = inventory.container.size
    }
    /**
     * Add an item in the inventory
     * @param {Item} item Item to add into the inventory 
     */
    addItem(item: Item): void {
        this._inventory.container.addItem(item.getItemStack())
    }
    /**
     * Amount of empty slots in the entity's inventory
     */
    get emptySlotCount(): number {
        return this._inventory.container.emptySlotsCount
    }
    /**
     * Get an item from a slot
     * @param {number} slot Slot to get the item from
     * @returns {Item}
     */
    getItem(slot: number): Item {
        if (slot < 0 || slot > this.size + 1) throw new Error(`Slot count is to small or to large! Method "inventory.getItem()"`)
        return new Item(this._inventory.container.getItem(slot))
    }
    /**
     * Set an item in the inventory
     * @param {number} slot Slot to set the item in
     * @param {Item} item Item to set the slot to
     */
    setItem(slot: number, item: Item): void {
        if (slot < 0 || slot > this.size + 1) throw new Error(`Slot count is to small or to large! Method "inventory.setItem()"`)
        this._inventory.container.setItem(slot, item.getItemStack())
    }
    /**
     * Swap 2 items in this inventory or another inventory
     * @param {number} slot Slot in the inventory
     * @param {number} otherSlot Slot in the other inventory
     * @param {EntityInventory} otherContainer Other inventory to swap items with
     * @returns {boolean} ...idk
     */
    swapItems(slot: number, otherSlot: number, otherContainer?: BlockInventory | EntityInventory): boolean {
        //@ts-ignore
        return this._inventory.container.swapItems(slot, otherSlot, otherContainer ? otherContainer._inventory.container : this._inventory.container)
    }
}