import { world } from "mojang-minecraft"

const names: string[] = []


/**
 * Database
 */
export class Database {
    readonly name: string;
    /**
     * Create a new database!
     */
    constructor(name: string) {
        this.name = JSON.stringify(name).slice(1, -1).replaceAll(/\\"/g, '\\\\"')
        if (names.includes(this.name)) throw new Error(`You can't have 2 of the same databases`)
        if (this.name.includes('"')) throw new TypeError(`Database names can't include "!`)
        if (this.name.length > 13 || this.name.length === 0) throw new Error(`Database names can't be more than 13 characters long or no characters!`)
        names.push(this.name)
        runCommand(`scoreboard objectives add "DB_${this.name}" dummy`)
    }
    /**
     * Set a value from a key
     * @param {string} key Key to set
     * @param {any} value The value
     */
    set(key: string, value: any) {
        if (key.includes('_')) throw new TypeError(`Database keys can't include "_"`)
        if ((JSON.stringify(value).replaceAll(/"/g, '\\"').length + key.replaceAll(/"/g, '\\"').length + 1) > 32000) throw new Error(`Database setter to long... somehow`)
        const test = world.scoreboard.getObjective(`DB_${this.name}`).getParticipants().find(e => e.displayName.startsWith(key.replaceAll(/"/g, '\\"')))
        if (test) runCommand(`scoreboard players reset "${test.displayName}"`)
        runCommand(`scoreboard players set "${key.replaceAll(/"/g, '\\"')}_${JSON.stringify(value).replaceAll(/"/g, '\\"')}" "DB_${this.name}" 0`)
    }
    /**
     * Get a value from a key
     * @param {string} key Key to get
     * @returns {any} The value that was set for the key (or undefined)
     */
    get(key: string): any {
        if (key.includes('_')) throw new TypeError(`Database keys can't include "_"`)
        const test = world.scoreboard.getObjective(`DB_${this.name}`).getParticipants().find(e => e.displayName.startsWith(key.replaceAll(/"/g, '\\"')))
        if (!test) return undefined
        return JSON.parse(test.displayName.slice(key.replaceAll(/"/g, '\\"').length + 1).replaceAll(/\\"/g, '"'))
    }
    /**
     * Test for whether or not the database has the key
     * @param {string} key Key to test for
     * @returns {boolean} Whether or not the database has the key
     */
    has(key: string): boolean {
        if (!world.scoreboard.getObjective(`DB_${this.name}`).getParticipants().find(e => e.displayName.startsWith(key.replaceAll(/"/g, '\\"')))) return false
        return true
    }
    /**
     * Delete a key from the database
     * @param {string} key Key to delete from the database
     */
    delete(key: string): void {
        const test = world.scoreboard.getObjective(`DB_${this.name}`).getParticipants().find(e => e.displayName.startsWith(key.replaceAll(/"/g, '\\"')))
        if (test) runCommand(`scoreboard players reset "${test.displayName}"`)
    }
    /**
     * Get an array of all keys in the database
     * @returns {string[]} An array of all keys in the database
     */
    keys(): string[] {
        return world.scoreboard.getObjective(`DB_${this.name}`).getParticipants().map(e => e.displayName.split("_")[0].replaceAll(/\\"/g, '"'))
    }
    /**
     * Get an array of all values in the database
     * @returns {any[]} An array of all values in the database
     */
    values(): any[] {
        return world.scoreboard.getObjective(`DB_${this.name}`).getParticipants().map(e => JSON.parse(e.displayName.split("_").filter((v, i) => i > 0).join("_").replaceAll(/\\"/g, '"')))
    }
    /**
     * Clears all values in the database
     */
    clear(): void {
        runCommand(`scoreboard objectives remove "DB_${this.name}"`)
        runCommand(`scoreboard objectives add "DB_${this.name}" dummy`)
    }
    /**
     * Loop through all keys and values of the database
     * @param {(key: string, value: any) => void} callback Code to run per loop
     */
    forEach(callback: (key: string, value: any) => void) {
        world.scoreboard.getObjective(`DB_${this.name}`).getParticipants().forEach(e => callback(e.displayName.split('_')[0].replaceAll(/\\"/g, '"'), JSON.parse(e.displayName.split("_").filter((v, i) => i > 0).join("_").replaceAll(/\\"/g, '"'))))
    }
}

/**
 * Run a command!
 * @param {string} cmd Command to run
 * @returns {{ error: boolean, data: any }} Whether or not the command errors, and command data
 * @example runCommand(`give @a diamond`)
 */
function runCommand(cmd: string): { error: boolean, data: any } {
    try { return { error: false, data: world.getDimension('overworld').runCommand(cmd) } } catch { return { error: true, data: undefined } }
}