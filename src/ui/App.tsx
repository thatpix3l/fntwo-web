import { render } from "solid-js/web";
import { createSignal } from 'solid-js';
import * as solidDND from '@thisbeyond/solid-dnd';
import "./UI.css";

export function start(keyState: { [keyname: string]: boolean }) {

    const ui_root = document.getElementById("ui-root")!; // Reference to element for UI components
    const model_root = document.getElementById('model-root')!; // Reference to element for model viewer

    const [uiVisible, setUIVisibility] = createSignal(false); // Signal for flipping the UI on and off

    // Generic wrapper class to run any function only when allowed to
    // Useful for running toggles only once, on certain conditions
    class toggleHelper {
        allowRun: boolean;
        action: () => void;

        // Allow running whatever action the first time on initialization
        constructor(action: () => void) {
            this.allowRun = true;
            this.action = action;
        }

        // After first run, disable next call to run
        // It's up to the developer for deciding on when to allow the next run
        run() {

            if (this.allowRun) {
                this.action();
                this.allowRun = false;
            }

        }

    };

    const showUI = () => {
        ui_root.className = "active";
        model_root.className = "inactive";
    }

    const hideUI = () => {
        ui_root.className = "inactive";
        model_root.className = "active";

    }

    hideUI() // On first load, hide the UI and only present the model viewer

    // Toggle visibility of elements, based on UI visibility
    const toggleUI = new toggleHelper(() => {
        setUIVisibility(!uiVisible());

        if (uiVisible()) {
            showUI();

        } else {
            hideUI();

        }

    });

    const uiControlLoop = () => {

        if (keyState["Escape"]) {
            toggleUI.run();

        } else {
            toggleUI.allowRun = true;

        }

        requestAnimationFrame(uiControlLoop);

    }

    uiControlLoop();

    // Structure of main menu
    const SidePanes = () => <section class="section is-flex is-flex-direction-row">

        <div id="left-menu-pane" class="box has-background-light" ondragover={(ev) => {console.log(ev)}} ondrop={(ev) => {console.log(ev)}}>
            <h1 class="title">
                Load New Model
            </h1>
            <p>
                Drag and drop your .vrm file onto me!
            </p>
        </div>

        <div>
        </div>

        <div id="right-menu-pane" class="box has-background-light">
            <h1 class="title">Edit Existing Model</h1>
        </div>

    </section>;

    render(() => <SidePanes/>, ui_root);
};