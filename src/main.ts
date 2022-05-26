import * as model from "./model/Model";
import * as ui from "./ui/App";

// Global key capture, for use in both the Model viewer and UI control
const keyState: { [keyname: string]: boolean } = {};

// Event listeners for immediate feedback on key status
document.addEventListener('keydown', (ev) => {
    keyState[ev.key] = true;
}, true);

document.addEventListener('keyup', (ev) => {
    keyState[ev.key] = false;
}, true);

// Start model viewer and UI
model.start(keyState);
ui.start(keyState);