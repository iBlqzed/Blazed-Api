import { Enchantment, ItemStack, MinecraftEnchantmentTypes } from "mojang-minecraft";
import { ItemComponents } from "../Types/index";
export declare class Item {
    /**
     * The item id
     */
    readonly id: string;
    /**
     * The item stack
     */
    protected readonly itemStack: ItemStack;
    /**
     * Create a new item class with an item stack or item id
     * @param {ItemStack | string} item Item stack or id of the item
     */
    constructor(item: ItemStack | string);
    /**
     * Add an enchant to the item
     * @param {{ enchant: keyof typeof MinecraftEnchantmentTypes, level?: number }} enchant Enchant to add to the item
     * @returns {boolean} Whether or not the the enchant was added successfully
     */
    addEnchant(enchant: {
        enchant: keyof typeof MinecraftEnchantmentTypes;
        level?: number;
    }): boolean;
    /**
     * The amount of the item
     */
    get amount(): number;
    set amount(amount: number);
    /**
     * The data value of the item
     */
    get data(): number;
    set data(data: number);
    /**
     * Test if two items are equal
     * @param {Item} item Item to test with
     * @returns {boolean} Whether or not they are equal
     */
    equals(item: Item): boolean;
    /**
     * Get an item component
     * @param {keyof ItemComponents} component Component to get
     * @returns {any} The component
     */
    getComponent<compName extends keyof ItemComponents>(component: compName): ItemComponents[compName];
    /**
     * Get all components on the item
     * @returns {any[]} All components on this item
     */
    getComponents(): any[];
    /**
     * Get an enchant from the item
     * @param {keyof typeof MinecraftEnchantmentTypes} enchant Enchant to get from the item
     * @returns {Enchantment} The enchant
     */
    getEnchant(enchant: keyof typeof MinecraftEnchantmentTypes): Enchantment;
    /**
     * Get all enchants on the item
     * @returns {Enchantment[]} All enchants on the item
     */
    getEnchants(): Enchantment[];
    /**
     * Get the item stack
     * @returns {ItemStack} The item stack
     */
    getItemStack(): ItemStack;
    /**
     * The item's lore
     */
    get lore(): string[];
    set lore(lore: string[]);
    /**
     * Test whether or not the item has a component
     * @param {string} component Component to test for
     * @returns {boolean} Whether or not the item has the component
     */
    hasComponent(component: string): boolean;
    /**
     * The name of the item
     */
    get name(): string;
    set name(name: string);
    /**
     * Remove an enchant from the item
     * @param {keyof typeof MinecraftEnchantmentTypes} enchant Enchant to remove from the item
     */
    removeEnchant(enchant: keyof typeof MinecraftEnchantmentTypes): void;
    /**
     * Trigger an item event
     * @param {string} event Event to trigger
     */
    triggerEvent(event: string): void;
}
