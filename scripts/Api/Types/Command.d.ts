import type { Player } from "../Entity/index";
export interface CommandInfo {
    /**
     * The name of the command
     */
    name: string;
    /**
     * Command description (does nothing, you make it do something)
     */
    description?: string;
    /**
     * Any command aliases
     */
    aliases?: string[];
    /**
     * Callback for whether or not the player has valid permissions
     */
    permission?: (player: Player) => boolean;
}
export interface CommandData extends CommandInfo {
    callback(data: {
        player: Player;
        args: string[];
    }): void;
    prefix: string;
}
