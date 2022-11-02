import { MessageFormData, MessageFormResponse } from "@minecraft/server-ui";
import { Player } from "../Entity/index.js";

/**
 * Create a new MessageForm
 */
export class MessageForm {
    /**
     * Create a new MessageForm!
     */
    constructor() { }
    /**
     * The actual form
     */
    protected form = new MessageFormData()
    /**
     * The title and body
     */
    protected data: string[] = new Array<string>(2)
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
     * Set the form's first button
     * @param {string} text Text for the button
     * @returns {MessageForm} The message form
     * @example .setButton1('Confirm?')
     */
    setButton1(text: string): MessageForm {
        this.form.button1(text)
        return this
    }
    /**
     * Set the form's second button
     * @param {string} text Text for the button
     * @returns {MessageForm} The message form
     * @example .setButton1('Cancel?')
     */
    setButton2(text: string): MessageForm {
        this.form.button2(text)
        return this
    }
    /**
     * Set the body's text
     * @param {string} text The body's new text
     * @returns {MessageForm} The message form
     * @example .setBody("Text")
     */
    setBody(text: string): MessageForm {
        this.data[1] = text
        this.form.body(text)
        return this
    }
    /**
     * Set the body's text
     * @param {string} text The body's new text
     * @returns {MessageForm} The message form
     * @example .setTitle("Text")
     */
    setTitle(text: string): MessageForm {
        this.data[0] = text
        this.form.title(text)
        return this
    }
    /**
     * Show the form to a player
     * @param {Player} player Player to show the form to
     * @returns {Promise<MessageFormResponse>} Message form promise
     * @example .show(player).then(result => {
     * console.warn(result.selection)
     * })
     */
    async show(player: Player): Promise<MessageFormResponse> {
        return this.form.show(player.getIEntity())
    }
}