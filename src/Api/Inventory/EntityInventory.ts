import type { EntityInventoryComponent } from "@minecraft/server";
import { Entity } from "../Entity/index.js";
import { Item } from "../Item/index.js";
import { BlockInventory } from "./BlockInventory";

/**
 * An entity's inventory
 */
export class EntityInventory {
    protected readonly _entity: Entity
    protected readonly _inventory: EntityInventoryComponent
    /**
     * The id of the inventory
     */
    readonly id: "minecraft:inventory"
    /**
     * The size of the inventory
     */
    readonly size: number
    /**
     * The type of the inventory
     */
    readonly containerType: string
    /**
     * Whether or not the inventory is private
     */
    readonly private: boolean
    /**
     * Whether or not the inventory can be siphoned from
     */
    readonly canBeSiphonedFrom: boolean
    constructor(entity: Entity) {
        const inventory = entity.getComponent('inventory')
        this._entity = entity
        this._inventory = inventory
        this.id = "minecraft:inventory"
        this.size = inventory.inventorySize
        this.containerType = inventory.containerType
        this.private = inventory.private
        this.canBeSiphonedFrom = inventory.canBeSiphonedFrom
    }
    /**
     * Add an item in the inventory
     * @param {Item} item Item to add into the inventory 
     */
    addItem(item: Item): void {
        if (this.emptySlotCount !== 0) this._inventory.container.addItem(item.getItemStack())
        else this._entity.getDimension().spawnItem(item, this._entity.getLocation())
    }
    /**
     * Amount of empty slots in the entity's inventory
     */
    get emptySlotCount(): number {
        return this._inventory.container.emptySlotsCount
    }
    /**
     * Loop through all items in the inventory
     * @param {(item: Item, index: number, array: Item[]) => void} callback Callback to run for each item
     * @param {any} thisArg The "this" value for the loop
     */
    forEach(callback: (item: Item, index: number, array: Item[]) => void, thisArg?: any): void {
        new Array(this.size).fill(undefined).map((_, i) => this.getItem(i)).forEach(callback, thisArg)
    }
    /**
     * Get an item from a slot
     * @param {number} slot Slot to get the item from
     * @returns {Item}
     */
    getItem(slot: number): Item {
        if (slot < 0 || slot > this.size + 1) throw new Error(`Slot count is to small or to large! Method "inventory.getItem()"`)
        return new Item(this._inventory.container.getItem(slot) ?? "minecraft:air", { slot, entity: this._entity })
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
    swapItems(slot: number, otherSlot: number, otherContainer?: EntityInventory | BlockInventory): boolean {
        //@ts-ignore
        return this._inventory.container.swapItems(slot, otherSlot, otherContainer ? otherContainer._inventory.container : this._inventory.container)
    }
}