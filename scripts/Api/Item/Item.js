import { Enchantment, Items, ItemStack, MinecraftEnchantmentTypes } from "mojang-minecraft";
export class Item {
    /**
     * Create a new item class with an item stack or item id
     * @param {ItemStack | string} item Item stack or id of the item
     */
    constructor(item) {
        const _item = item instanceof ItemStack ? item : new ItemStack(Items.get(item));
        this.itemStack = _item;
        this.id = _item?.id;
    }
    /**
     * Add an enchant to the item
     * @param {{ enchant: keyof typeof MinecraftEnchantmentTypes, level?: number }} enchant Enchant to add to the item
     * @returns {boolean} Whether or not the the enchant was added successfully
     */
    addEnchant(enchant) {
        const eC = this.itemStack?.getComponent('enchantments'), eL = eC.enchantments;
        if (!eC)
            return;
        //@ts-ignore
        const rV = eL.addEnchantment(new Enchantment(MinecraftEnchantmentTypes[enchant], enchant.level));
        eC.enchantments = eL;
        return rV;
    }
    /**
     * The amount of the item
     */
    get amount() {
        return this.itemStack?.amount;
    }
    set amount(amount) {
        this.itemStack && (this.itemStack.amount = amount);
    }
    /**
     * The data value of the item
     */
    get data() {
        return this.itemStack?.data;
    }
    set data(data) {
        this.itemStack && (this.itemStack.data = data);
    }
    /**
     * Test if two items are equal
     * @param {Item} item Item to test with
     * @returns {boolean} Whether or not they are equal
     */
    equals(item) {
        if (this.id !== item.id)
            return false;
        if (this.name !== item.name)
            return false;
        if (this.amount !== item.amount)
            return false;
        if (this.data !== item.data)
            return false;
        if (JSON.stringify(this.lore) !== JSON.stringify(item.lore))
            return false;
        if (this.getEnchants()?.filter(ench => {
            //@ts-ignore
            const otherEnch = item.getEnchant(ench.type.id);
            if (!otherEnch)
                return false;
            if (otherEnch.level === ench.level)
                return true;
            return false;
        }).length !== this.getEnchants().length)
            return false;
        return true;
    }
    /**
     * Get an item component
     * @param {keyof ItemComponents} component Component to get
     * @returns {any} The component
     */
    getComponent(component) {
        //@ts-ignore
        return this.itemStack?.getComponent(component);
    }
    /**
     * Get all components on the item
     * @returns {any[]} All components on this item
     */
    getComponents() {
        return this.itemStack?.getComponents();
    }
    /**
     * Get an enchant from the item
     * @param {keyof typeof MinecraftEnchantmentTypes} enchant Enchant to get from the item
     * @returns {Enchantment} The enchant
     */
    getEnchant(enchant) {
        // @ts-ignore
        return this.getComponent('enchantments')?.enchantments?.getEnchantment(MinecraftEnchantmentTypes[enchant]);
    }
    /**
     * Get all enchants on the item
     * @returns {Enchantment[]} All enchants on the item
     */
    getEnchants() {
        const eL = [];
        for (const _ench in MinecraftEnchantmentTypes) {
            //@ts-ignore
            const ench = this.getEnchant(_ench);
            if (!ench)
                continue;
            eL.push(ench);
        }
        return eL;
    }
    /**
     * Get the item stack
     * @returns {ItemStack} The item stack
     */
    getItemStack() {
        return this.itemStack;
    }
    /**
     * The item's lore
     */
    get lore() {
        return this.itemStack?.getLore();
    }
    set lore(lore) {
        this.itemStack?.setLore(lore);
    }
    /**
     * Test whether or not the item has a component
     * @param {string} component Component to test for
     * @returns {boolean} Whether or not the item has the component
     */
    hasComponent(component) {
        return this.itemStack?.hasComponent(component);
    }
    /**
     * The name of the item
     */
    get name() {
        return this.itemStack?.nameTag;
    }
    set name(name) {
        this.itemStack && (this.itemStack.nameTag = name);
    }
    /**
     * Remove an enchant from the item
     * @param {keyof typeof MinecraftEnchantmentTypes} enchant Enchant to remove from the item
     */
    removeEnchant(enchant) {
        const eC = this.itemStack?.getComponent('enchantments'), eL = eC?.enchantments;
        if (!eC)
            return;
        // @ts-ignore
        eL.removeEnchantment(MinecraftEnchantmentTypes[enchant]);
        eC.enchantments = eL;
    }
    /**
     * Trigger an item event
     * @param {string} event Event to trigger
     */
    triggerEvent(event) {
        this.itemStack?.triggerEvent(event);
    }
}
