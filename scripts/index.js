import { Client } from "./Api/index";
const client = new Client();
client.on('EntityHit', (data) => {
});
