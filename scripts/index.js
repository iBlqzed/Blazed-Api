import { Database } from "./Api/index.js";
const database = new Database('eee');
database.set('e', 'b');
database.forEach((key, value) => console.warn(key, ' : ', value));
