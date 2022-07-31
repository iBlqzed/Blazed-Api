import { Enchantment, ItemEnchantsComponent, Items, ItemStack, MinecraftEnchantmentTypes } from "mojang-minecraft";
import { ItemComponents } from "../Types/index";

export class Item {
    /**
     * The item id
     */
    readonly id: string
    /**
     * The item stack
     */
    protected readonly itemStack: ItemStack
    /**
     * Create a new item class with an item stack or item id
     * @param {ItemStack | string} item Item stack or id of the item
     */
    constructor(item: ItemStack | string) {
        const _item = item instanceof ItemStack ? item : new ItemStack(Items.get(item))
        this.itemStack = _item
        this.id = _item?.id
    }
    /**
     * Add an enchant to the item
     * @param {{ enchant: keyof typeof MinecraftEnchantmentTypes, level?: number }} enchant Enchant to add to the item
     * @returns {boolean} Whether or not the the enchant was added successfully
     */
    addEnchant(enchant: { enchant: keyof typeof MinecraftEnchantmentTypes, level?: number }): boolean {
        const eC = this.itemStack?.getComponent('enchantments') as ItemEnchantsComponent, eL = eC.enchantments
        if (!eC) return;
        //@ts-ignore
        const rV = eL.addEnchantment(new Enchantment(MinecraftEnchantmentTypes[enchant], enchant.level))
        eC.enchantments = eL
        return rV
    }
    /**
     * The amount of the item
     */
    get amount(): number {
        return this.itemStack?.amount
    }
    set amount(amount: number) {
        this.itemStack && (this.itemStack.amount = amount)
    }
    /**
     * The data value of the item
     */
    get data(): number {
        return this.itemStack?.data
    }
    set data(data: number) {
        this.itemStack && (this.itemStack.data = data)
    }
    /**
     * Test if two items are equal
     * @param {Item} item Item to test with
     * @returns {boolean} Whether or not they are equal
     */
    equals(item: Item): boolean {
        if (this.id !== item.id) return false
        if (this.name !== item.name) return false
        if (this.amount !== item.amount) return false
        if (this.data !== item.data) return false
        if (JSON.stringify(this.lore) !== JSON.stringify(item.lore)) return false
        if (this.getEnchants()?.filter(ench => {
            //@ts-ignore
            const otherEnch = item.getEnchant(ench.type.id)
            if (!otherEnch) return false
            if (otherEnch.level === ench.level) return true
            return false
        }).length !== this.getEnchants().length) return false
        return true
    }
    /**
     * Get an item component
     * @param {keyof ItemComponents} component Component to get
     * @returns {any} The component
     */
    getComponent<compName extends keyof ItemComponents>(component: compName): ItemComponents[compName] {
        //@ts-ignore
        return this.itemStack?.getComponent(component)
    }
    /**
     * Get all components on the item
     * @returns {any[]} All components on this item
     */
    getComponents(): any[] {
        return this.itemStack?.getComponents()
    }
    /**
     * Get an enchant from the item
     * @param {keyof typeof MinecraftEnchantmentTypes} enchant Enchant to get from the item
     * @returns {Enchantment} The enchant
     */
    getEnchant(enchant: keyof typeof MinecraftEnchantmentTypes): Enchantment {
        // @ts-ignore
        return this.getComponent('enchantments')?.enchantments?.getEnchantment(MinecraftEnchantmentTypes[enchant])
    }
    /**
     * Get all enchants on the item
     * @returns {Enchantment[]} All enchants on the item
     */
    getEnchants(): Enchantment[] {
        const eL = [] as Enchantment[]
        for (const _ench in MinecraftEnchantmentTypes) {
            //@ts-ignore
            const ench = this.getEnchant(_ench)
            if (!ench) continue
            eL.push(ench)
        }
        return eL
    }
    /**
     * Get the item stack
     * @returns {ItemStack} The item stack
     */
    getItemStack(): ItemStack {
        return this.itemStack
    }
    /**
     * The item's lore
     */
    get lore(): string[] {
        return this.itemStack?.getLore()
    }
    set lore(lore: string[]) {
        this.itemStack?.setLore(lore)
    }
    /**
     * Test whether or not the item has a component
     * @param {string} component Component to test for
     * @returns {boolean} Whether or not the item has the component
     */
    hasComponent(component: string): boolean {
        return this.itemStack?.hasComponent(component)
    }
    /**
     * The name of the item
     */
    get name(): string {
        return this.itemStack?.nameTag
    }
    set name(name: string) {
        this.itemStack && (this.itemStack.nameTag = name)
    }
    /**
     * Remove an enchant from the item
     * @param {keyof typeof MinecraftEnchantmentTypes} enchant Enchant to remove from the item
     */
    removeEnchant(enchant: keyof typeof MinecraftEnchantmentTypes): void {
        const eC = this.itemStack?.getComponent('enchantments') as ItemEnchantsComponent, eL = eC?.enchantments
        if (!eC) return;
        // @ts-ignore
        eL.removeEnchantment(MinecraftEnchantmentTypes[enchant])
        eC.enchantments = eL
    }
    /**
     * Trigger an item event
     * @param {string} event Event to trigger
     */
    triggerEvent(event: string): void {
        this.itemStack?.triggerEvent(event)
    }
}