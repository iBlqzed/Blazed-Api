import { ActionFormData, ActionFormResponse } from "mojang-minecraft-ui";
import { Player } from "../Entity/index.js";

/**
 * Create a new ActionForm
 */
export class ActionForm {
    /**
     * Create a new ActionForm!
     */
    constructor() { }
    /**
     * The actual form
     */
    protected form = new ActionFormData()
    /**
     * The title and body
     */
    protected data: string[] = new Array<string>(2)
    /**
     * Add a button to the form
     * @param {string} text Text for the button
     * @param {string} iconPath The icon path for the button
     * @example .addButton('Diamond Sword!', 'textures/items/diamond_sword.png')
     */
    addButton(text: string, iconPath?: string): ActionForm {
        this.form.button(text, iconPath)
        return this
    }
    /**
     * Get the form's body
     * @returns {string} The form's body
     * @example .getBody()
     */
    getBody(): string {
        return this.data[1]
    }
    /**
     * Get the form's title
     * @returns {string} The form's title
     * @example .getTitle()
     */
    getTitle(): string {
        return this.data[0]
    }
    /**
     * Set the body's text
     * @param {string} text The body's new text
     * @returns {ActionForm} The action form
     * @example .setBody("Text")
     */
    setBody(text: string): ActionForm {
        this.data[1] = text
        this.form.body(text)
        return this
    }
    /**
     * Set the body's text
     * @param {string} text The body's new text
     * @returns {ActionForm} The action form
     * @example .setTitle("Text")
     */
    setTitle(text: string): ActionForm {
        this.data[0] = text
        this.form.title(text)
        return this
    }
    /**
     * Show the form to a player
     * @param {Player} player Player to show the form to
     * @returns {Promise<ActionFormResponse>} Action form promise
     * @example .show(player).then(result => {
     * console.warn(result.selection)
     * })
     */
    async show(player: Player): Promise<ActionFormResponse> {
        return this.form.show(player.getIEntity())
    }
}