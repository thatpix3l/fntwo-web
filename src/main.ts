import * as model from "./model/Model";
import * as ui from "./ui/App";
import { addressPrefix, initialConfig } from "./typings";

// Global key capture, for use in both the Model viewer and UI control
const keyState: { [keyname: string]: boolean } = {};

// Event listeners for immediate feedback on key status
document.addEventListener('keydown', (ev) => {
    keyState[ev.key] = true;
}, true);

document.addEventListener('keyup', (ev) => {
    keyState[ev.key] = false;
}, true);

// Default backend server prefix, if not able to read relatively from where this frontend is hosted
let backendAddrPrefix = new addressPrefix("127.0.0.1:3579");
let initCfg = new initialConfig();

// Start model viewer and UI
(async () => {

    try {
        // Assuming the frontend is hosted on the same server as the API, try to pull the real initial config
        initCfg = await (await fetch("/api/initialConfig")).json();
        backendAddrPrefix.socket = location.host;

    } catch(e) {
        console.log("Couldn't pull from where this web application is hosted the initial backend config, using defaults", initCfg, backendAddrPrefix);

    }

    // Start the UI and model viewer
    [model, ui].forEach(elem => { elem.start(keyState, backendAddrPrefix) });

})();
