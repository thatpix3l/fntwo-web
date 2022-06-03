import * as model from "./model/Model";
import * as ui from "./ui/UI";
import { addressPrefix, appConfig } from "./typings";

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
let backendAddrPrefix = new addressPrefix(location.hostname + ":3579");
let appCfg = new appConfig();

// Start model viewer and UI
(async () => {

    try {
        // Assuming the frontend is hosted on the same server as the API, try to pull the real initial config
        appCfg = await (await fetch("/api/config/app")).json();
        backendAddrPrefix.socket = location.host;

    } catch(e) {
        console.error("Error trying to pull app config, using defaults", appCfg, backendAddrPrefix);

    }

    // Start the UI and model viewer
    [model, ui].forEach(elem => { elem.start(keyState, backendAddrPrefix) });

})();
