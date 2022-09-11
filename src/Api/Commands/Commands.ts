import { ClientOptions } from '../Types/index'
import { Player } from "../Entity/index";
import { CommandData, CommandInfo } from "../Types/index";

export class Commands {
    static registeredCommands: CommandData[] = []
    static clients = [] as ClientOptions[]
    protected options?: ClientOptions
    constructor(options?: ClientOptions) {
        this.options = options
        if (options?.command?.enabled) {
            if (Commands.clients.map(e => e.command.prefix).includes(options.command.prefix)) throw new Error(`You can't have 2 clients with the same command prefix`)
            Commands.clients.push(options)
        }
    }
    /**
     * Create a new command
     * @param {CommandInfo} info The command info
     * @param {(data: {player: Player, args: string[]}) => void} callback Code to run when the command is ran
     */
    create(info: CommandInfo, callback: (data: { player: Player, args: string[] }) => void): void {
        if (!this.options?.command?.enabled) throw new Error(`Commands are disabled! You can change that in the client options`)
        if (Commands.registeredCommands.find(e => e.prefix === this.options.command.prefix && e.name === info.name)) throw new Error(`There is already a command with the name of "${info.name}"`)
        Commands.registeredCommands.push({
            name: info.name.toLowerCase().split(' ')[0],
            description: info.description ?? undefined,
            aliases: info.aliases?.map(aL => aL.toLowerCase().split(' ')[0]) ?? [],
            permission: info.permission,
            prefix: this.options.command.prefix,
            callback
        })
    }
    /**
     * Remove a command
     * @param {string} command The name of the command to remove
     */
    remove(command: string): void {
        if (!this.options?.command?.enabled) throw new Error(`Commands are disabled! You can change that in the client options`)
        const index = Commands.registeredCommands.findIndex(cmd => cmd.name === command.toLowerCase())
        if (index === -1) return;
        Commands.registeredCommands.splice(index, 1)
    }
    /**
     * Loop through all commands
     * @param {(value: CommandData, index: number, array: CommandData[]) => void} callback Code to run per loop
     * @param {any} thisArg The value of this "this" word
     */
    forEach(callback: (value: CommandData, index: number, array: CommandData[]) => void, thisArg?: any) {
        if (!this.options?.command?.enabled) throw new Error(`Commands are disabled! You can change that in the client options`)
        Commands.registeredCommands.forEach(callback, thisArg)
    }
    /**
     * Clear all commands
     */
    clear(): void {
        if (!this.options?.command?.enabled) throw new Error(`Commands are disabled! You can change that in the client options`)
        Commands.registeredCommands = []
    }
}