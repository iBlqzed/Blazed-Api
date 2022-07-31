import { Client } from "./Api/index.js";

const client = new Client({
    command: {
        enabled: true
    }
})

client.commands.create({
    name: 'urmom'
}, (data) => {
    console.warn(data.player.name)
})

client.on('Chat', data => {
    data.player.runCommand(`urmom`)
})