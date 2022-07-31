import { Player } from "../Entity/index";
import { world } from 'mojang-minecraft';
import { broadcastMessage } from '../utils';
export class Commands {
    constructor(options) {
        Commands.options = options;
    }
    /**
     * Create a new command
     * @param {CommandInfo} info The command info
     * @param {(data: {player: Player, args: string[]}) => void} callback Code to run when the command is ran
     */
    create(info, callback) {
        if (!Commands.options?.command?.enabled)
            throw new Error(`Commands are disabled! You can change that in the client options`);
        Commands.registeredCommands.push({
            name: info.name.toLowerCase().split(' ')[0],
            description: info.description ?? undefined,
            aliases: info.aliases?.map(aL => aL.toLowerCase().split(' ')[0]) ?? undefined,
            permissions: info.permissions ?? [],
            callback
        });
    }
    /**
     * Remove a command
     * @param {string} command The name of the command to remove
     */
    remove(command) {
        if (!Commands.options?.command?.enabled)
            throw new Error(`Commands are disabled! You can change that in the client options`);
        const index = Commands.registeredCommands.findIndex(cmd => cmd.name === command.toLowerCase());
        if (index === -1)
            return;
        Commands.registeredCommands.splice(index, 1);
    }
    /**
     * Loop through all commands
     * @param {(value: CommandData, index: number, array: CommandData[]) => void} callback Code to run per loop
     * @param {any} thisArg The value of this "this" word
     */
    forEach(callback, thisArg) {
        if (!Commands.options?.command?.enabled)
            throw new Error(`Commands are disabled! You can change that in the client options`);
        Commands.registeredCommands.forEach(callback, thisArg);
    }
    /**
     * Clear all commands
     */
    clear() {
        if (!Commands.options?.command?.enabled)
            throw new Error(`Commands are disabled! You can change that in the client options`);
        Commands.registeredCommands = [];
    }
}
Commands.registeredCommands = [];
const arg = world.events.beforeChat.subscribe(data => {
    if (!Commands.options?.command.enabled)
        return world.events.beforeChat.unsubscribe(arg);
    if (data.message.startsWith(Commands.options?.command?.prefix ?? '-')) {
        data.cancel = true;
        const args = data.message.trim().slice((Commands.options?.command?.prefix ?? '-').length).split(/\s+/g);
        const cmd = args.shift().toLowerCase();
        const cmdData = Commands.registeredCommands.find(command => command.name === cmd || command.aliases?.includes(cmd));
        if (!cmdData)
            return broadcastMessage(Commands.options?.command?.invalidCommandError ?? `§cInvalid command!`);
        if (cmdData.permissions && cmdData.permissions.find(tag => !data.sender.hasTag(tag)))
            return broadcastMessage(Commands.options?.command.invalidPermissionsError ?? `§cInvalid permission!`);
        cmdData.callback({ player: new Player(data.sender), args });
    }
});
