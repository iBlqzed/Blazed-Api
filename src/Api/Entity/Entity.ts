import { Player as IPlayer, Block as IBlock, BlockRaycastOptions, CommandResult, Effect, EffectType, Entity as IEntity, EntityRaycastOptions, IEntityComponent, Location, MinecraftEffectTypes, ScreenDisplay, Vector, world, XYRotation, BlockLocation } from "mojang-minecraft"
import { Block } from "../Block/Block.js"
import { Commands } from "../Commands/index.js"
import { EntityInventory } from "../Inventory/index.js"
import { Item } from "../Item/index.js"
import type { Gamemode, EntityComponents } from "../Types/index.js"
import { locationFunctions } from "../utils.js"
import { Dimension } from "../World/index.js"

export class Entity {
    /**
     * The entity
     */
    protected entity: IEntity
    constructor(entity: IEntity) {
        this.entity = entity
    }
    /**
     * Add an effect to the entity
     * @param {string} effect Effect to add to the entity
     * @param {number} duration Amount of time (in ticks) for the effect to last
     * @param {number} amplifier The strength of the effect
     * @param {boolean} showParticles Whether or not to show particles
     */
    addEffect(effect: keyof (typeof MinecraftEffectTypes), duration: number, amplifier?: number, showParticles?: boolean): void {
        this.entity.addEffect(MinecraftEffectTypes[effect] as EffectType, duration, amplifier, showParticles)
    }
    /**
     * Add a score to an objective
     * @param {string} objective Objective to add the score to
     * @param {number} score Amount to add to the objective
     */
    addScore(objective: string, score: number): void {
        this.runCommand(`scoreboard players add @s "${objective}" ${score}`)
    }
    /**
     * Add a tag to the entity
     * @param {string} tag Tag to add to the entity
     * @returns {boolean} Whether or not the tag was added successfully
     */
    addTag(tag: string): boolean {
        return this.entity.addTag(tag)
    }
    /**
     * Find a tag with startWiths and endsWith options
     * @param {{ startsWith?: string, endsWith?: string }} tagOptions Tag options to find
     * @returns {string} Tag that is found, or undefined if nothing is found
     */
    findTag(tagOptions: { startsWith?: string, endsWith?: string }): string {
        if ("startsWith" in tagOptions && "endsWith" in tagOptions) return this.entity.getTags().find(tag => tag.startsWith(tagOptions.startsWith) && tag.endsWith(tagOptions.endsWith))
        if ("startsWith" in tagOptions) return this.entity.getTags().find(tag => tag.startsWith(tagOptions.startsWith))
        if ("endsWith" in tagOptions) return this.entity.getTags().find(tag => tag.endsWith(tagOptions.endsWith))
        return undefined
    }
    /**
     * Get the block in the entity's view vector
     * @param {BlockRaycastOptions} options Optional block raycast options
     * @returns {Block} Block in the entity's view vector
     */
    getBlockFromViewVector(options?: BlockRaycastOptions): Block {
        return new Block(this.entity.getBlockFromViewVector(options))
    }
    /**
     * Get a component from the player
     * @param {string} component Component to get from the entity
     * @returns {IEntityComponent} The component
     */
    getComponent<componentName extends keyof EntityComponents>(component: componentName): EntityComponents[componentName] {
        //@ts-ignore
        return this.entity.getComponent(component) as any
    }
    /**
     * Get all components that the entity has
     * @returns {IEntityComponent[]} All components of the entity
     */
    getComponents(): IEntityComponent[] {
        return this.entity.getComponents()
    }
    /**
     * Get the dimension of the entity
     * @returns {Dimension} The entity's dimension
     */
    getDimension(): Dimension {
        return new Dimension(this.entity.dimension)
    }
    /**
     * Get a dynamic property from the entity
     * @param {string} identifier The id of the property you want to get
     * @returns {boolean | number | string} The value of the property
     */
    getDynamicProperty(identifier: string): boolean | number | string {
        return this.entity.getDynamicProperty(identifier)
    }
    /**
     * Get an effect that the entity has
     * @param {string} effect Effect to get
     * @returns {Effect} The effect that the entity has
     */
    getEffect<effect extends keyof (typeof MinecraftEffectTypes)>(effect: effect): Effect {
        return this.entity.getEffect(MinecraftEffectTypes[effect] as EffectType)
    }
    /**
     * Get all (or one idk) entities in the entity's view vector
     * @param {EntityRaycastOptions} options Entity raycast options
     * @returns {Entity[]} An array of all entities (or first idk) in the entity's view vector
     */
    getEntitiesFromViewVector(options?: EntityRaycastOptions): Entity[] {
        return this.entity.getEntitiesFromViewVector(options).map(entity => new Entity(entity))
    }
    /**
     * Get the entity's head location
     * @returns {Location} The entity's head location
     */
    getHeadLocation(): Location {
        return this.entity.headLocation
    }
    /**
     * Get the entity's health (if they have health)
     * @returns {number} The entity's health
     */
    getHealth(): number {
        return this.getComponent('health')?.current
    }
    /**
     * Get the entity's id
     * @returns {string} The entity's id
     */
    getId(): string {
        return this.entity.id
    }
    /**
     * Get the IEntity
     * @returns {IEntity} The IEntity
     */
    getIEntity(): IEntity {
        return this.entity
    }
    /**
     * Get the entity's inventory (if they have one)
     * @returns {EntityInventory} The entity's inventory
     */
    getInventory(): EntityInventory {
        return this.hasComponent('inventory') ? new EntityInventory(this) : undefined
    }
    /**
     * Get the entity's location
     * @returns {Location} The entity's location
     */
    getLocation(): Location {
        return this.entity.location
    }
    /**
     * Get the entity's max health (if they have health)
     * @returns {number} The entity's max health
     */
    getMaxHealth(): number {
        const health = this.getHealth()
        this.getComponent('health').resetToMaxValue()
        const z = this.getHealth()
        this.setHealth(health)
        return z
    }
    /**
     * Get the entity's name tag
     * @returns {string} The entity's nametag
     */
    getNameTag(): string {
        return this.entity.nameTag
    }
    /**
     * Get the entity's rotation
     * @returns {XYRotation} The entity's rotation
     */
    getRotation(): XYRotation {
        return this.entity.rotation
    }
    /**
     * Get the entity's score on a scoreboard
     * @param {string} objective Objective name to get the score from
     * @param {boolean} useZero Whether or not to return 0 if error (normally returns NaN)
     * @returns {number} The score on the scoreboard
     */
    getScore(objective: string, useZero?: boolean): number {
        try {
            const obj = world.scoreboard.getObjective(objective);
            return obj.getScore(this.entity.scoreboard);
        } catch {
            return useZero ? 0 : NaN;
        }
    }
    /**
     * Get all tags that the entity has
     * @returns {string[]} All tags of the entity
     */
    getTags(): string[] {
        return this.entity.getTags()
    }
    /**
     * Get the entity's target
     * @returns {Entity} The entity's target
     */
    getTarget(): Entity {
        return new Entity(this.entity.target)
    }
    /**
     * Get the entity's velocity
     * @returns {Vector} The entity's velocity
     */
    getVelocity(): Vector {
        return this.entity.velocity
    }
    /**
     * Get the entity's view vector
     * @returns {Vector} The entity's view vector
     */
    getViewVector(): Vector {
        return this.entity.viewVector
    }
    /**
     * Test whether or not the entity has a certain component
     * @param {string} component Component to test for
     * @returns {boolean} Whether or not the entity has the component
     */
    hasComponent(component: string): boolean {
        return this.entity.hasComponent(component)
    }
    /**
     * Test for whether or not the player has a certain tag
     * @param {string} tag Tag to test for
     * @returns {boolean} Whether or not the entity has the tag
     */
    hasTag(tag: string): boolean {
        return this.entity.hasTag(tag)
    }
    /**
     * Whether or not the entity is a player
     * @returns {Player} The entity but player
     */
    isPlayer(): this is Player {
        return this.getId() === "minecraft:player"
    }
    /**
     * Kill the entity
     */
    kill(): void {
        this.entity.kill()
    }
    /**
     * Remove a dynamic property from the entity
     * @param {string} identifier Id of the property being removed
     * @returns {boolean} Whether or not it was removed successfully
     */
    removeDynamicProperty(identifier: string): boolean {
        return this.entity.removeDynamicProperty(identifier)
    }
    /**
     * Remove a score from an objective
     * @param {string} objective Objective to remove the score from
     * @param {number} score Amount to remove from the objective
     */
    removeScore(objective: string, score: number): void {
        this.runCommand(`scoreboard players remove @s "${objective}" ${score}`)
    }
    /**
     * Remove a tag from the entity
     * @param {string} tag Tag to remove from the entity
     * @returns {boolean} Whether or not the tag was removed successfully
     */
    removeTag(tag: string): boolean {
        return this.entity.removeTag(tag)
    }
    /**
     * Make the entity run a command
     * @param {string} command Command to run
     * @returns {{ error: boolean, data?: any }} Command data + error
     */
    runCommand(command: string): { error: boolean, data?: any } {
        try {
            return { error: false, data: this.entity.runCommand(command) }
        } catch {
            return { error: true };
        }
    }
    /**
     * Make the entity run an async command
     * @param {string} command Command to run
     * @returns {Promise<CommandResult>} i dont even know man...
     */
    runCommandAsync(command: string): Promise<CommandResult> {
        return this.entity.runCommandAsync(command)
    }
    /**
     * Set a dynamic property
     * @param {string} identifier Id of the property to set
     * @param {boolean | number | string} value Value to set the property to
     */
    setDynamicProperty(identifier: string, value: boolean | number | string): void {
        this.entity.setDynamicProperty(identifier, value)
    }
    /**
     * Set the entity's health (if they have health)
     * @param {number}  health Amount to set the entity's health too
     */
    setHealth(health: number): void {
        this.getComponent('health')?.setCurrent(health)
    }
    /**
     * Set the entity's nametag
     * @param {string} name The value to set the nametag to
     */
    setNameTag(name: string): void {
        this.entity.nameTag = name
    }
    /**
     * Set the main rotation of the entity
     * @param {number} degreesX Degrees on the X axis to set the rotation to
     * @param {number} degreesY Degrees on the Y axis to set the rotation to
     */
    setRotation(degreesX: number, degreesY: number): void {
        this.entity.setRotation(degreesX, degreesY)
    }
    /**
     * Set a score for an objective
     * @param {string} objective Objective to set the score to
     * @param {number} score Amount to set for the objective
     */
    setScore(objective: string, score: number): void {
        this.runCommand(`scoreboard players set @s "${objective}" ${score}`)
    }
    /**
     * Set the velocity of the entity
     * @param {Vector} velocity New velocity for the entity
     */
    setVelocity(velocity: Vector): void {
        this.entity.setVelocity(velocity)
    }
    /**
     * Set the entity's target
     * @param {Entity} entity The entity to be the new entity's target
     */
    setTarget(entity: Entity): void {
        this.entity.target = entity.entity
    }
    teleport(location: Location | BlockLocation, dimension?: Dimension, xRot?: number, yRot?: number, keepVelocity?: boolean) {
        //@ts-ignore
        this.entity.teleport(location instanceof Location ? location : locationFunctions.blockLocationToLocation(location), dimension ?? this.getDimension().dimension, xRot ?? this.getRotation().x, yRot ?? this.getRotation().y, keepVelocity)
    }
    /**
     * Trigger an entity event
     * @param {string} event Event to trigger
     */
    triggerEvent(event: string): void {
        this.entity.triggerEvent(event)
    }
}

export class Player extends Entity {
    protected entity: IPlayer
    protected readonly _log: PlayerLog
    constructor(player: IPlayer) {
        super(player)
        this._log = new PlayerLog(player.name)
    }
    /**
     * Add xp points to the player
     * @param {number} amount Amount of xp points to add to the player
     */
    addXpPoints(amount: number): void {
        if (!Number.isSafeInteger(amount)) return
        this.runCommand(`/xp ${amount} @s`)
    }
    /**
     * Add xp levels to the player
     * @param {number} amount Amount of xp levels to add to the player
     */
    addXpLevels(amount: number): void {
        if (!Number.isSafeInteger(amount)) return
        this.runCommand(`/xp ${amount}L @s`)
    }
    /**
     * Clear the player's spawn point
     */
    clearRespawnPoint(): void {
        this.runCommand(`/clearspawnpoint @s`)
    }
    /**
     * Clear the player's title
     * @remarks Only clears title and subtitle, not actionbar
     */
    clearTitle(): void {
        this.runCommand(`/title @s clear`)
    }
    /**
     * Get the player's gamemode
     * @returns {Gamemode} The player's gamemode
     */
    getGamemode(): Gamemode {
        const survivalTest = this.runCommand(`testfor @s[m=0]`).error
        if (!survivalTest) return 'survival'
        const creativeTest = this.runCommand(`testfor @s[m=1]`).error
        if (!creativeTest) return 'creative'
        const adventureTest = this.runCommand(`testfor @s[m=2]`).error
        if (!adventureTest) return 'adventure'
        return 'unknown'
    }
    /**
     * Get the item the player is holding
     * @returns {Item} The item the player is holding
     */
    getHeldItem(): Item {
        return this.getInventory().getItem(this.entity.selectedSlot)
    }
    /**
     * Get the player's id
     * @returns {"minecraft:player"} The player's id
     */
    getId(): "minecraft:player" {
        return this.entity.id as "minecraft:player"
    }
    /**
     * Get the IPlayer
     * @returns {IPlayer} The IPlayer
     */
    getIEntity(): IPlayer {
        return this.entity
    }
    /**
     * Get an item cooldown from an item catagory
     * @param {string} itemCatagory Catagory of cooldown to test for
     * @returns {number} The length of that cooldown
     */
    getItemCooldown(itemCatagory: string): number {
        return this.entity.getItemCooldown(itemCatagory)
    }
    /**
     * Get the player's log (like a map attached to the player)
     * @returns {PlayerLog} The player's log
     */
    getLog(): PlayerLog {
        return this._log
    }
    /**
     * Get the player's name
     * @returns {string} The player's name
     */
    getName(): string {
        return this.entity.name
    }
    /**
     * Get the player's screen display
     * @returns {ScreenDisplay} The player's screen display
     */
    getScreenDisplay(): ScreenDisplay {
        return this.entity.onScreenDisplay
    }
    /**
     * Get the player's selected slot
     * @returns {number} The selected slot
     */
    getSelectedSlot(): number {
        return this.entity.selectedSlot
    }
    /**
     * Test for whether or not the player is dead
     * @returns {boolean} Whether or not the player is dead
     */
    isDead(): boolean {
        return this.hasTag(`is_dead`)
    }
    /**
     * Test for whether or not the player is jumping
     * @returns {boolean} Whether or not the player is jumping
     */
    isJumping(): boolean {
        return this.hasTag(`is_jumping`)
    }
    /**
     * Test for whether or not the player is moving
     * @returns {boolean} Whether or not the player is moving
     */
    isMoving(): boolean {
        return this.hasTag(`is_moving`)
    }
    /**
     * Test for whether or not the player is on fire
     * @returns {boolean} Whether or not the player is on fire
     */
    isOnFire(): boolean {
        return this.hasTag('is_on_fire')
    }
    /**
     * Test for whether or not the player is sleeping
     * @returns {boolean} Whether or not the player is sleeping
     */
    isSleeping(): boolean {
        return this.hasTag('is_sleeping')
    }
    /**
     * Test for whether or not the player is sneaking
     * @returns {boolean} Whether or not the player is sneaking
     */
    isSneaking(): boolean {
        return this.hasTag('is_sneaking')
    }
    /**
     * Test for whether or not the player is sprinting
     * @returns {boolean} Whether or not the player is sprinting
     */
    isSprinting(): boolean {
        return this.hasTag('is_sprinting')
    }
    /**
     * Test for whether or not the player is swimming
     * @returns {boolean} Whether or not the player is swimming
     */
    isSwimming(): boolean {
        return this.hasTag('is_swimming')
    }
    /**
     * Test for whether or not the player is using an item
     * @returns {boolean} Whether or not the player is using an item
     */
    isUsingItem(): boolean {
        return this.hasTag('is_using_item')
    }
    /**
     * Kick the player
     * @param {string} reason The reason they got kicked
     */
    kick(reason?: string) {
        this.entity.runCommand(`kick "${this.entity.name}" ${reason ?? ''}`)
    }
    /**
     * Message the player
     * @param {string} msg The message to send to the player
     */
    message(msg: any): void {
        this.runCommand(`tellraw @s {"rawtext":[{"text":"${(typeof msg === "string" ? msg : typeof msg === "number" ? msg.toString() : JSON.stringify(msg)).replace(/"/g, '\\"')}"}]}`)
    }
    /**
     * Set the player's gamemode
     * @param {Gamemode} gamemode The gamemode to set the player too
     */
    setGamemode(gamemode: Gamemode) {
        if (gamemode !== 'unknown') this.runCommand(`gamemode ${gamemode} @s`)
    }
    /**
     * Set the item the player is holding
     * @param {Item} item The item that the player will be holding
     */
    setHeldItem(item: Item) {
        this.getInventory().setItem(this.entity.selectedSlot, item)
    }
    /**
     * Make the player run a command
     * @param {string} command Command to run (includes custom commands)
     * @returns {any} Command data + error
     */
    runCommand(command: string): { error: boolean, data?: any } {
        try {
            if (command.startsWith('/')) return { error: false, data: this.entity.runCommand(command.slice(1)) };
            const args = command.trim().split(/\s+/g)
            const cmdName = args.shift().toLowerCase()
            const data = Commands.registeredCommands.find(cmd => cmd.name === cmdName || cmd.aliases?.includes(cmdName))
            if (!data) return { error: false, data: this.entity.runCommand(command) }
            data.callback({ player: this, args })
            return { error: false }
        } catch (e) {
            return { error: true, data: e }
        }
    }
}

export class PlayerLog {
    protected name: string
    protected _size: number
    constructor(name: string) {
        this.name = name
        this._size = 0
    }
    /**
     * Get a value from a key
     * @param {any} key The key of the value to get
     * @returns {any} The value of the key
     */
    get(key: any): any {
        return playerLog.get(this.name).get(key)
    }
    /**
     * Set a value with a key
     * @param {any} key The key of the value
     * @param {any} value The value to set
     */
    set(key: any, value: any): void {
        const map = playerLog.get(this.name)
        map.set(key, value)
        this._size++
        playerLog.set(this.name, map)
    }
    /**
     * Delete a value with a key
     * @param {any} key Key to delete
     */
    delete(key: any): void {
        playerLog.get(this.name).delete(key)
        this._size--
    }
    /**
     * Test if the log has a value from a key
     * @param {any} key Key to test for
     * @returns {boolean} Whether or not the log has said key
     */
    has(key: any): boolean {
        return playerLog.get(this.name).has(key)
    }
    /**
     * Clear all values and keys from the log
     */
    clear(): void {
        playerLog.get(this.name).clear()
    }
    /**
     * Get all keys in the log
     * @returns {IterableIterator<any>} All keys
     */
    keys(): IterableIterator<any> {
        return playerLog.get(this.name).keys()
    }
    /**
     * Get all values in the log
     * @returns {IterableIterator<any>} All values
     */
    values(): IterableIterator<any> {
        return playerLog.get(this.name).values()
    }
    /**
     * Loop through all keys and values of the log
     * @param {(value: any, key: any) => void} callback Callback to run for every key and value
     * @param {any} thisArg ...idk
     */
    forEach(callback: (value: any, key: any) => void, thisArg?: any) {
        playerLog.get(this.name).forEach(callback, thisArg)
    }
    /**
     * Get the size of the log
     * @returns {number} The size of the log
     */
    getSize(): number {
        return this._size
    }
}
const playerLog: Map<string, Map<any, any>> = new Map()
world.events.playerJoin.subscribe(({ player }) => playerLog.set(player.name, new Map()))
world.events.playerLeave.subscribe(({ playerName }) => playerLog.delete(playerName))
for (const { name } of world.getPlayers()) playerLog.set(name, new Map())