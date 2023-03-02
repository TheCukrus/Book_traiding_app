import app from "./App.js";
import config from "./utils/config.js";

app.listen(config.listening_port, config.listening_network_card_adress, ()=>
{
    console.log(`http://${config.listening_network_card_adress}:${config.listening_port}`)
})