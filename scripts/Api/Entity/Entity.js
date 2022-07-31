import { MinecraftEffectTypes, world } from "mojang-minecraft";
import { Commands } from "../Commands/index.js";
import { EntityInventory } from "../Inventory/index.js";
import { Dimension } from "../World/index.js";
const playerLog = new Map();
world.events.playerLeave.subscribe(({ playerName }) => playerLog.delete(playerName));
for (const player of world.getPlayers())
    playerLog.set(player.name, new Map());
world.events.playerJoin.subscribe(({ player }) => playerLog.set(player.name, new Map()));
export class Entity {
    constructor(entity) {
        this.entity = entity;
        this.dimension = new Dimension(entity.dimension);
        this.headLocation = entity.headLocation;
        this.id = entity.id;
        this.location = entity.location;
        this.rotation = entity.rotation;
        this.scoreboard = entity.scoreboard;
        this.velocity = entity.velocity;
        this.viewVector = entity.viewVector;
    }
    /**
     * Add an effect to the entity
     * @param {string} effect Effect to add to the entity
     * @param {number} duration Amount of time (in ticks) for the effect to last
     * @param {number} amplifier The strength of the effect
     * @param {boolean} showParticles Whether or not to show particles
     */
    addEffect(effect, duration, amplifier, showParticles) {
        this.entity.addEffect(MinecraftEffectTypes[effect], duration, amplifier, showParticles);
    }
    /**
     * Add a score to an objective
     * @param {string} objective Objective to add the score to
     * @param {number} score Amount to add to the objective
     */
    addScore(objective, score) {
        this.runCommand(`scoreboard players add @s "${objective}" ${score}`);
    }
    /**
     * Add a tag to the entity
     * @param {string} tag Tag to add to the entity
     * @returns {boolean} Whether or not the tag was added successfully
     */
    addTag(tag) {
        return this.entity.addTag(tag);
    }
    /**
     * Find a tag with startWiths and endsWith options
     * @param {{ startsWith?: string, endsWith?: string }} tagOptions Tag options to find
     * @returns {string} Tag that is found, or undefined if nothing is found
     */
    findTag(tagOptions) {
        if ("startsWith" in tagOptions && "endsWith" in tagOptions)
            return this.entity.getTags().find(tag => tag.startsWith(tagOptions.startsWith) && tag.endsWith(tagOptions.endsWith));
        if ("startsWith" in tagOptions)
            return this.entity.getTags().find(tag => tag.startsWith(tagOptions.startsWith));
        if ("endsWith" in tagOptions)
            return this.entity.getTags().find(tag => tag.endsWith(tagOptions.endsWith));
        return undefined;
    }
    /**
     * Get the block in the entity's view vector
     * @param {BlockRaycastOptions} options Optional block raycast options
     * @returns {Block} Block in the entity's view vector
     */
    getBlockFromViewVector(options) {
        return this.entity.getBlockFromViewVector(options);
    }
    /**
     * Get a component from the player
     * @param {string} component Component to get from the entity
     * @returns {IEntityComponent} The component
     */
    getComponent(component) {
        //@ts-ignore
        return this.entity.getComponent(component);
    }
    /**
     * Get all components that the entity has
     * @returns {IEntityComponent[]} All components of the entity
     */
    getComponents() {
        return this.entity.getComponents();
    }
    /**
     * Get a dynamic property from the entity
     * @param {string} identifier The id of the property you want to get
     * @returns {boolean | number | string} The value of the property
     */
    getDynamicProperty(identifier) {
        return this.entity.getDynamicProperty(identifier);
    }
    /**
     * Get an effect that the entity has
     * @param {string} effect Effect to get
     * @returns {Effect} The effect that the entity has
     */
    getEffect(effect) {
        return this.entity.getEffect(MinecraftEffectTypes[effect]);
    }
    /**
     * Get all (or one idk) entities in the entity's view vector
     * @param {EntityRaycastOptions} options Entity raycast options
     * @returns {Entity[]} An array of all entities (or first idk) in the entity's view vector
     */
    getEntitiesFromViewVector(options) {
        return this.entity.getEntitiesFromViewVector(options).map(entity => new Entity(entity));
    }
    /**
     * Get the IEntity
     * @returns {IEntity} The IEntity
     */
    getIEntity() {
        return this.entity;
    }
    /**
     * Get the entity's score on a scoreboard
     * @param {string} objective Objective name to get the score from
     * @param {boolean} useZero Whether or not to return 0 if error (normally returns NaN)
     * @returns {number} The score on the scoreboard
     */
    getScore(objective, useZero) {
        try {
            const obj = world.scoreboard.getObjective(objective);
            return obj.getScore(this.entity.scoreboard);
        }
        catch {
            return useZero ? 0 : NaN;
        }
    }
    /**
     * Get all tags that the entity has
     * @returns {string[]} All tags of the entity
     */
    getTags() {
        return this.entity.getTags();
    }
    /**
     * Test whether or not the entity has a certain component
     * @param {string} component Component to test for
     * @returns {boolean} Whether or not the entity has the component
     */
    hasComponent(component) {
        return this.entity.hasComponent(component);
    }
    /**
     * Test whether or not the player has a certain tag
     * @param {string} tag Tag to test for
     * @returns {boolean} Whether or not the entity has the tag
     */
    hasTag(tag) {
        return this.entity.hasTag(tag);
    }
    /**
     * The entity's health (if they have health)
     */
    get health() {
        return this.getComponent('health')?.current;
    }
    set health(health) {
        this.getComponent('health')?.setCurrent(health);
    }
    /**
     * The entity's inventory (if they have one)
     */
    get inventory() {
        return this.hasComponent('inventory') ? new EntityInventory(this) : undefined;
    }
    /**
     * Whether or not the entity is sneaking (or doing sneaking movement)
     */
    get isSneaking() {
        return this.entity.isSneaking;
    }
    set isSneaking(value) {
        this.entity.isSneaking = value;
    }
    /**
     * Kill the entity
     */
    kill() {
        this.entity.kill();
    }
    /**
     * The nametag of the entity
     */
    get nameTag() {
        return this.entity.nameTag;
    }
    set nameTag(name) {
        this.entity.nameTag = name;
    }
    /**
     * Remove a dynamic property from the entity
     * @param {string} identifier Id of the property being removed
     * @returns {boolean} Whether or not it was removed successfully
     */
    removeDynamicProperty(identifier) {
        return this.entity.removeDynamicProperty(identifier);
    }
    /**
     * Remove a score from an objective
     * @param {string} objective Objective to remove the score from
     * @param {number} score Amount to remove from the objective
     */
    removeScore(objective, score) {
        this.runCommand(`scoreboard players remove @s "${objective}" ${score}`);
    }
    /**
     * Remove a tag from the entity
     * @param {string} tag Tag to remove from the entity
     * @returns {boolean} Whether or not the tag was removed successfully
     */
    removeTag(tag) {
        return this.entity.removeTag(tag);
    }
    /**
     * Make the entity run a command
     * @param {string} command Command to run
     * @returns {any} Command data + error
     */
    runCommand(command) {
        try {
            return { error: false, ...this.entity.runCommand(command) };
        }
        catch {
            return { error: true };
        }
    }
    /**
     * Make the entity run an async command
     * @param {string} command Command to run
     * @returns {Promise<CommandResult>} i dont even know man...
     */
    runCommandAsync(command) {
        return this.entity.runCommandAsync(command);
    }
    /**
     * Set a dynamic property
     * @param {string} identifier Id of the property to set
     * @param {boolean | number | string} value Value to set the property to
     */
    setDynamicProperty(identifier, value) {
        this.entity.setDynamicProperty(identifier, value);
        this.entity.setVelocity;
    }
    /**
     * Set the main rotation of the entity
     * @param {number} degreesX Degrees on the X axis to set the rotation to
     * @param {number} degreesY Degrees on the Y axis to set the rotation to
     */
    setRotation(degreesX, degreesY) {
        this.entity.setRotation(degreesX, degreesY);
    }
    /**
     * Set a score for an objective
     * @param {string} objective Objective to set the score to
     * @param {number} score Amount to set for the objective
     */
    setScore(objective, score) {
        this.runCommand(`scoreboard players set @s "${objective}" ${score}`);
    }
    /**
     * Set the velocity of the entity
     * @param {Vector} velocity New velocity for the entity
     */
    setVelocity(velocity) {
        this.entity.setVelocity(velocity);
    }
    /**
     * The target of the entity
     */
    get target() {
        return new Entity(this.entity.target);
    }
    set target(entity) {
        this.entity.target = entity.entity;
    }
    /**
     * Trigger an entity event
     * @param {string} event Event to trigger
     */
    triggerEvent(event) {
        this.entity.triggerEvent(event);
    }
}
export class Player extends Entity {
    constructor(player) {
        super(player);
        this.name = player.name;
        this.onScreenDisplay = player.onScreenDisplay;
        this.log = new PlayerLog(player.name);
    }
    /**
     * The gamemode of the player
     */
    get gamemode() {
        const survivalTest = this.runCommand(`testfor @s[m=0]`).error;
        if (!survivalTest)
            return 'survival';
        const creativeTest = this.runCommand(`testfor @s[m=1]`).error;
        if (!creativeTest)
            return 'creative';
        const adventureTest = this.runCommand(`testfor @s[m=2]`).error;
        if (!adventureTest)
            return 'adventure';
        return 'unknown';
    }
    set gamemode(gamemode) {
        if (gamemode !== 'unknown')
            this.runCommand(`gamemode ${gamemode} @s`);
    }
    /**
     * Get an item cooldown from an item catagory
     * @param {string} itemCatagory Catagory of cooldown to test for
     * @returns {number} The length of that cooldown
     */
    getItemCooldown(itemCatagory) {
        return this.entity.getItemCooldown(itemCatagory);
    }
    /**
     * The item the player is holding
     */
    get heldItem() {
        return this.inventory.getItem(this.entity.selectedSlot);
    }
    set heldItem(item) {
        this.inventory.setItem(this.entity.selectedSlot, item);
    }
    /**
     * Message the player
     * @param {string} msg The message to send to the player
     */
    message(msg) {
        this.runCommand(`tellraw @s {"rawtext":[{"text":${JSON.stringify(msg)}}]}`);
    }
    /**
     * Make the player run a command
     * @param {string} command Command to run (includes custom commands)
     * @returns {any} Command data + error
     */
    runCommand(command) {
        try {
            if (!Commands.options?.command?.enabled)
                return { error: false, ...this.entity.runCommand(command) };
            const args = command.trim().split(/\s+/g);
            const cmdName = args.shift().toLowerCase();
            const data = Commands.registeredCommands.find(cmd => cmd.name === cmdName || cmd.aliases?.includes(cmdName));
            if (!data)
                return { error: false, ...this.entity.runCommand(command) };
            data.callback({ player: this, args });
            return { error: false };
        }
        catch {
            return { error: true };
        }
    }
    /**
     * Show a form to the player
     * @param {ActionFormData | ModalFormData | MessageFormData} form Form to show to the player
     * @param {(response: ActionFormResponse | ModalFormResponse | MessageFormResponse) => void} callback Code to run when the form is shown
     */
    showForm(form, callback) {
        form.show(this.entity).then(result => {
            // @ts-ignore
            callback(result);
        });
    }
}
class PlayerLog {
    constructor(name) {
        this.name = name;
        this._size = 0;
    }
    /**
     * Get a value from a key
     * @param {any} key The key of the value to get
     * @returns {any} The value of the key
     */
    get(key) {
        return playerLog.get(this.name).get(key);
    }
    /**
     * Set a value with a key
     * @param {any} key The key of the value
     * @param {any} value The value to set
     */
    set(key, value) {
        const map = playerLog.get(this.name);
        map.set(key, value);
        this._size++;
        playerLog.set(this.name, map);
    }
    /**
     * Delete a value with a key
     * @param {any} key Key to delete
     */
    delete(key) {
        playerLog.get(this.name).delete(key);
        this._size--;
    }
    /**
     * Test if the log has a value from a key
     * @param {any} key Key to test for
     * @returns {boolean} Whether or not the log has said key
     */
    has(key) {
        return playerLog.get(this.name).has(key);
    }
    /**
     * Clear all values and keys from the log
     */
    clear() {
        playerLog.get(this.name).clear();
    }
    /**
     * Get all keys in the log
     * @returns {IterableIterator<any>} All keys
     */
    keys() {
        return playerLog.get(this.name).keys();
    }
    /**
     * Get all values in the log
     * @returns {IterableIterator<any>} All values
     */
    values() {
        return playerLog.get(this.name).values();
    }
    /**
     * Loop through all keys and values of the log
     * @param {(value: any, key: any) => void} callback Callback to run for every key and value
     * @param {any} thisArg ...idk
     */
    forEach(callback, thisArg) {
        playerLog.get(this.name).forEach(callback, thisArg);
    }
    /**
     * The size of the log
     */
    get size() {
        return this._size;
    }
}
