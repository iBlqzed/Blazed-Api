import { Client } from "./Api/index";
const client = new Client();
client.on('ItemUse', data => {
    console.warn(data.entity.id);
});
