import { render } from "solid-js/web";
import { createSignal } from 'solid-js';
import {toggleHelper} from "../typings";
import "./App.css";

export function start(keyState: { [keyname: string]: boolean }) {

    const ui_root = document.getElementById("ui-root")!; // Reference to element for UI components
    const model_root = document.getElementById('model-root')!; // Reference to element for model viewer

    const [uiVisible, setUIVisibility] = createSignal(false); // Signal for flipping the UI on and off

    // Helper function to show the menu UI
    const showUI = () => {
        ui_root.className = "active";
        model_root.className = "inactive";
    }

    // Helper function to hide the menu UI
    const hideUI = () => {
        ui_root.className = "inactive";
        model_root.className = "active";

    }

    hideUI() // On first load, hide the UI and only present the model viewer

    // Toggle visibility of elements, based on UI visibility
    const toggleUI = new toggleHelper(() => {
        setUIVisibility(!uiVisible());

        uiVisible() ? showUI() : hideUI();

    });

    // Main loop for controlling the UI
    const uiControlLoop = () => {

        // On press and hold of the Escape key, toggle once the UI
        keyState["Escape"] ? toggleUI.run() : toggleUI.allowRun = true;

        requestAnimationFrame(uiControlLoop);

    }

    uiControlLoop(); // Start loop for controlling the UI

    // Prevent browser from opening any dropped files directly
    window.addEventListener('drop', (ev: DragEvent) => ev.preventDefault(), false);
    window.addEventListener('dragover', (ev: DragEvent) => ev.preventDefault(), false);

    // Signal that's flipped when dragging a file into and out of the drag and drop window
    const [isDragging, setDragging] = createSignal(false);

    // Process a passed in VRM file
    const processFileVRM = (vrmFile: File) => {

        console.log("Processing and sending new VRM");

        // PUT received VRM model file to backend server
        fetch('http://127.0.0.1:3579/api/model', {
            method: "PUT",
            body: vrmFile
        });

    }

    // Reference to input element for manually uploading files
    let vrmInputElem: HTMLInputElement;

    // Extract the VRM file from dragging and dropping
    const processDroppedVRM = (ev: DragEvent) => {

        // Prevent default window action with dragging and dropping files
        ev.preventDefault();
        const vrmFile = ((ev.dataTransfer as DataTransfer).files as FileList)[0];
        processFileVRM(vrmFile);

    }

    // Extract the VRM file from manually clicking upload window
    const processUploadedVRM = (ev: HTMLInputElement | Event) => {

        const vrmFile = (vrmInputElem.files as FileList)[0];
        processFileVRM(vrmFile);

    };

    // Structure of main menu
    const SidePanes = () => <section class="section is-flex is-flex-direction-row">

        {/* Left pane in main menu, for dragging and dropping new VRM models */}
        <div id="left-menu-pane" class="box has-background-light">
            {/* Title */}
            <h1 class="title">
                Load New Model
            </h1>
            {/* Drag and drop window for VRM file upload. Also, tappable */}
            <div class="box vrm-upload-box"
                classList={{ "dragged-into": isDragging() }}
                ondragenter={() => { setDragging(true) }}
                ondragleave={() => { setDragging(false) }}
                ondrop={(ev) => { setDragging(false); processDroppedVRM(ev) }}
                onclick={() => { vrmInputElem.click() }}>

                <p>Drag and drop your <code>.vrm</code>, or click to manually pick!</p>
                <input class="vrm-file-dialog" ref={vrmInputElem} onchange={processUploadedVRM} type="file" />

            </div>
        </div>

        {/* Literally an empty div, for spacing */}
        <div>
        </div>

        {/* Right pane in main menu, for configuring the details of the currently loaded VRM model */}
        <div id="right-menu-pane" class="box has-background-light">
            <h1 class="title">Edit Existing Model</h1>
        </div>

    </section>;

    render(() => <SidePanes />, ui_root);
};