import { ClientOptions } from '../Types/index'
import { Player } from "../Entity/index";
import { CommandData, CommandInfo } from "../Types/index";
import { world } from 'mojang-minecraft';
import { broadcastMessage } from '../utils';

export class Commands {
    static registeredCommands: CommandData[] = []
    static options?: ClientOptions
    constructor(options?: ClientOptions) {
        Commands.options = options
    }
    /**
     * Create a new command
     * @param {CommandInfo} info The command info
     * @param {(data: {player: Player, args: string[]}) => void} callback Code to run when the command is ran
     */
    create(info: CommandInfo, callback: (data: { player: Player, args: string[] }) => void): void {
        if (!Commands.options?.command?.enabled) throw new Error(`Commands are disabled! You can change that in the client options`)
        Commands.registeredCommands.push({
            name: info.name.toLowerCase().split(' ')[0],
            description: info.description ?? undefined,
            aliases: info.aliases?.map(aL => aL.toLowerCase().split(' ')[0]) ?? undefined,
            permissions: info.permissions ?? [],
            callback
        })
    }
    /**
     * Remove a command
     * @param {string} command The name of the command to remove
     */
    remove(command: string): void {
        if (!Commands.options?.command?.enabled) throw new Error(`Commands are disabled! You can change that in the client options`)
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
        if (!Commands.options?.command?.enabled) throw new Error(`Commands are disabled! You can change that in the client options`)
        Commands.registeredCommands.forEach(callback, thisArg)
    }
    /**
     * Clear all commands
     */
    clear(): void {
        if (!Commands.options?.command?.enabled) throw new Error(`Commands are disabled! You can change that in the client options`)
        Commands.registeredCommands = []
    }
}