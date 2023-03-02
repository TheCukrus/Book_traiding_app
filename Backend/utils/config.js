import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: `${__dirname}../../.env` });

const listening_port = process.env.LISTENING_PORT;
const listening_network_card_adress = process.env.LISTENING_NETWORK_CARD_ADRESS;
const mongoose_url = process.env.MONGOOSE_URL;
const open_weather = process.env.OPEN_WEATHER_API_KEY;
export default
    {
        listening_network_card_adress,
        listening_port,
        mongoose_url,
        open_weather
    }