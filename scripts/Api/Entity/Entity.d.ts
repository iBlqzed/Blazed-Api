import { Block, BlockRaycastOptions, CommandResult, Effect, Entity as IEntity, EntityRaycastOptions, IEntityComponent, Location, MinecraftEffectTypes, Player as IPlayer, ScoreboardIdentity, ScreenDisplay, Vector, XYRotation } from "mojang-minecraft";
import type { ActionFormData, ActionFormResponse, MessageFormData, MessageFormResponse, ModalFormData, ModalFormResponse } from "mojang-minecraft-ui";
import { EntityInventory } from "../Inventory/index.js";
import type { Item } from "../Item/index.js";
import type { Gamemode, EntityComponents } from "../Types/index.js";
import { Dimension } from "../World/index.js";
export declare class Entity {
    /**
     * The entity
     */
    protected entity: IEntity;
    /**
     * The dimension that the entity is in
     */
    readonly dimension: Dimension;
    /**
     * The location of the entity's head
     */
    readonly headLocation: Location;
    /**
     * The id of the entity
     */
    readonly id: string;
    /**
     * The location of the entity
     */
    readonly location: Location;
    /**
     * The rotation of the entity
     */
    readonly rotation: XYRotation;
    /**
     * The scoreboard identity of the entity
     */
    readonly scoreboard: ScoreboardIdentity;
    /**
     * The velocity of the entity
     */
    readonly velocity: Vector;
    /**
     * The view vector of the entity
     */
    readonly viewVector: Vector;
    constructor(entity: IEntity);
    /**
     * Add an effect to the entity
     * @param {string} effect Effect to add to the entity
     * @param {number} duration Amount of time (in ticks) for the effect to last
     * @param {number} amplifier The strength of the effect
     * @param {boolean} showParticles Whether or not to show particles
     */
    addEffect(effect: keyof (typeof MinecraftEffectTypes), duration: number, amplifier?: number, showParticles?: boolean): void;
    /**
     * Add a score to an objective
     * @param {string} objective Objective to add the score to
     * @param {number} score Amount to add to the objective
     */
    addScore(objective: string, score: number): void;
    /**
     * Add a tag to the entity
     * @param {string} tag Tag to add to the entity
     * @returns {boolean} Whether or not the tag was added successfully
     */
    addTag(tag: string): boolean;
    /**
     * Find a tag with startWiths and endsWith options
     * @param {{ startsWith?: string, endsWith?: string }} tagOptions Tag options to find
     * @returns {string} Tag that is found, or undefined if nothing is found
     */
    findTag(tagOptions: {
        startsWith?: string;
        endsWith?: string;
    }): string;
    /**
     * Get the block in the entity's view vector
     * @param {BlockRaycastOptions} options Optional block raycast options
     * @returns {Block} Block in the entity's view vector
     */
    getBlockFromViewVector(options?: BlockRaycastOptions): Block;
    /**
     * Get a component from the player
     * @param {string} component Component to get from the entity
     * @returns {IEntityComponent} The component
     */
    getComponent<componentName extends keyof EntityComponents, component extends EntityComponents[componentName]>(component: componentName): component;
    /**
     * Get all components that the entity has
     * @returns {IEntityComponent[]} All components of the entity
     */
    getComponents(): IEntityComponent[];
    /**
     * Get a dynamic property from the entity
     * @param {string} identifier The id of the property you want to get
     * @returns {boolean | number | string} The value of the property
     */
    getDynamicProperty(identifier: string): boolean | number | string;
    /**
     * Get an effect that the entity has
     * @param {string} effect Effect to get
     * @returns {Effect} The effect that the entity has
     */
    getEffect<effect extends keyof (typeof MinecraftEffectTypes)>(effect: effect): Effect;
    /**
     * Get all (or one idk) entities in the entity's view vector
     * @param {EntityRaycastOptions} options Entity raycast options
     * @returns {Entity[]} An array of all entities (or first idk) in the entity's view vector
     */
    getEntitiesFromViewVector(options?: EntityRaycastOptions): Entity[];
    /**
     * Get the IEntity
     * @returns {IEntity} The IEntity
     */
    getIEntity(): IEntity;
    /**
     * Get the entity's score on a scoreboard
     * @param {string} objective Objective name to get the score from
     * @param {boolean} useZero Whether or not to return 0 if error (normally returns NaN)
     * @returns {number} The score on the scoreboard
     */
    getScore(objective: string, useZero?: boolean): number;
    /**
     * Get all tags that the entity has
     * @returns {string[]} All tags of the entity
     */
    getTags(): string[];
    /**
     * Test whether or not the entity has a certain component
     * @param {string} component Component to test for
     * @returns {boolean} Whether or not the entity has the component
     */
    hasComponent(component: string): boolean;
    /**
     * Test whether or not the player has a certain tag
     * @param {string} tag Tag to test for
     * @returns {boolean} Whether or not the entity has the tag
     */
    hasTag(tag: string): boolean;
    /**
     * The entity's health (if they have health)
     */
    get health(): number;
    set health(health: number);
    /**
     * The entity's inventory (if they have one)
     */
    get inventory(): EntityInventory;
    /**
     * Whether or not the entity is sneaking (or doing sneaking movement)
     */
    get isSneaking(): boolean;
    set isSneaking(value: boolean);
    /**
     * Kill the entity
     */
    kill(): void;
    /**
     * The nametag of the entity
     */
    get nameTag(): string;
    set nameTag(name: string);
    /**
     * Remove a dynamic property from the entity
     * @param {string} identifier Id of the property being removed
     * @returns {boolean} Whether or not it was removed successfully
     */
    removeDynamicProperty(identifier: string): boolean;
    /**
     * Remove a score from an objective
     * @param {string} objective Objective to remove the score from
     * @param {number} score Amount to remove from the objective
     */
    removeScore(objective: string, score: number): void;
    /**
     * Remove a tag from the entity
     * @param {string} tag Tag to remove from the entity
     * @returns {boolean} Whether or not the tag was removed successfully
     */
    removeTag(tag: string): boolean;
    /**
     * Make the entity run a command
     * @param {string} command Command to run
     * @returns {any} Command data + error
     */
    runCommand(command: string): any;
    /**
     * Make the entity run an async command
     * @param {string} command Command to run
     * @returns {Promise<CommandResult>} i dont even know man...
     */
    runCommandAsync(command: string): Promise<CommandResult>;
    /**
     * Set a dynamic property
     * @param {string} identifier Id of the property to set
     * @param {boolean | number | string} value Value to set the property to
     */
    setDynamicProperty(identifier: string, value: boolean | number | string): void;
    /**
     * Set the main rotation of the entity
     * @param {number} degreesX Degrees on the X axis to set the rotation to
     * @param {number} degreesY Degrees on the Y axis to set the rotation to
     */
    setRotation(degreesX: number, degreesY: number): void;
    /**
     * Set a score for an objective
     * @param {string} objective Objective to set the score to
     * @param {number} score Amount to set for the objective
     */
    setScore(objective: string, score: number): void;
    /**
     * Set the velocity of the entity
     * @param {Vector} velocity New velocity for the entity
     */
    setVelocity(velocity: Vector): void;
    /**
     * The target of the entity
     */
    get target(): Entity;
    set target(entity: Entity);
    /**
     * Trigger an entity event
     * @param {string} event Event to trigger
     */
    triggerEvent(event: string): void;
}
export declare class Player extends Entity {
    protected entity: IPlayer;
    /**
     * The player's name
     */
    readonly name: string;
    /**
     * The player's log
     */
    readonly log: PlayerLog;
    /**
     * The player's screen display
     */
    readonly onScreenDisplay: ScreenDisplay;
    constructor(player: IPlayer);
    /**
     * The gamemode of the player
     */
    get gamemode(): Gamemode;
    set gamemode(gamemode: Gamemode);
    /**
     * Get an item cooldown from an item catagory
     * @param {string} itemCatagory Catagory of cooldown to test for
     * @returns {number} The length of that cooldown
     */
    getItemCooldown(itemCatagory: string): number;
    /**
     * The item the player is holding
     */
    get heldItem(): Item;
    set heldItem(item: Item);
    /**
     * Kick the player
     * @param {string} reason The reason they got kicked
     */
    kick(reason?: string): void;
    /**
     * Message the player
     * @param {string} msg The message to send to the player
     */
    message(msg: string): void;
    /**
     * Make the player run a command
     * @param {string} command Command to run (includes custom commands)
     * @returns {any} Command data + error
     */
    runCommand(command: string): {
        error: boolean;
        data?: any;
    };
    /**
     * Show a form to the player
     * @param {ActionFormData | ModalFormData | MessageFormData} form Form to show to the player
     * @param {(response: ActionFormResponse | ModalFormResponse | MessageFormResponse) => void} callback Code to run when the form is shown
     */
    showForm<form extends ActionFormData | ModalFormData | MessageFormData, response extends (response: form extends ActionFormData ? ActionFormResponse : form extends ModalFormData ? ModalFormResponse : form extends MessageFormData ? MessageFormResponse : null) => void>(form: form, callback: response): void;
}
declare class PlayerLog {
    protected name: string;
    protected _size: number;
    constructor(name: string);
    /**
     * Get a value from a key
     * @param {any} key The key of the value to get
     * @returns {any} The value of the key
     */
    get(key: any): any;
    /**
     * Set a value with a key
     * @param {any} key The key of the value
     * @param {any} value The value to set
     */
    set(key: any, value: any): void;
    /**
     * Delete a value with a key
     * @param {any} key Key to delete
     */
    delete(key: any): void;
    /**
     * Test if the log has a value from a key
     * @param {any} key Key to test for
     * @returns {boolean} Whether or not the log has said key
     */
    has(key: any): boolean;
    /**
     * Clear all values and keys from the log
     */
    clear(): void;
    /**
     * Get all keys in the log
     * @returns {IterableIterator<any>} All keys
     */
    keys(): IterableIterator<any>;
    /**
     * Get all values in the log
     * @returns {IterableIterator<any>} All values
     */
    values(): IterableIterator<any>;
    /**
     * Loop through all keys and values of the log
     * @param {(value: any, key: any) => void} callback Callback to run for every key and value
     * @param {any} thisArg ...idk
     */
    forEach(callback: (value: any, key: any) => void, thisArg?: any): void;
    /**
     * The size of the log
     */
    get size(): number;
}
export {};
