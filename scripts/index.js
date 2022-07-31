import { Client, Database } from "./Api/index.js";
const client = new Client();
const start = Date.now();
const e = new Database('e');
e.set('tomato', { interesting: 'didn\'t ask' });
e.set('banana', 'banana good ong');
e.forEach((key, value) => {
    console.warn(`${key} : ${JSON.stringify(value)}`);
});
console.warn(Date.now() - start);
client.on('Chat', data => {
    data.player.log.set('ChatAmount', data.player.log.get('ChatAmount') + 1);
    data.player.message(`You have chatted ${data.player.log.get('ChatAmount')} times!`);
});
