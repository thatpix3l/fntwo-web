<style>

#dashboard {
    position: fixed;
    width: 100%;
    height: 100%;
}

.inactive {
    display: none;
}

</style>

<script lang="ts">

import { onMount } from "svelte";

import ModelViewer from "./lib/svelte/ModelViewer/ModelViewer.svelte"

import type * as object from "./lib/ts/models/object"
import * as helper from "lib/ts/helper"
import Dashboard from "lib/svelte/UserInterface/Dashboard.svelte";

let vrmFile: File | undefined
let vrmFileURL: string = `${location.origin}/api/model`
let serverVRM: object.VRM
let serverCamera: object.Camera
let clientCamera: object.Camera

const syncVRMFile = async (file: File) => {

    await fetch("/api/model", {
        method: "PUT",
        body: file
    })

    const syncedFile = await fetch("/api/model", {
        method: "GET"
    }).then(resp => resp.blob())

    vrmFileURL = URL.createObjectURL(syncedFile)
    console.log(vrmFileURL)

}

$: {

    vrmFile && syncVRMFile(vrmFile)

}

const wsBaseURL = location.protocol === "https:" ? "wss://"+location.host : "ws://"+location.host

// Auto-connect to readable server camera
const cameraReadWS = new helper.ReconnectableWebSocket("readable server camera", wsBaseURL+"/live/read/camera", 1000, ev => {
    serverCamera = JSON.parse(ev.data)
});

// Auto-connect to writable server camera
const cameraWriteWS = new helper.ReconnectableWebSocket("writable server camera", `${wsBaseURL}/live/write/camera`, 1000, ev => {})

// Auto-send ThreeJS' camera to server, when changed
$: {
    cameraWriteWS.Send(JSON.stringify(clientCamera))
}

// Auto-connect to and read server VRM
const serverVRMSock = new helper.ReconnectableWebSocket("server vrm", wsBaseURL+"/live/read/model", 1000, ev => {
    serverVRM = JSON.parse(ev.data)
}); serverVRMSock

let modelViewerLoop: () => any

const mainLoop = () => {

    modelViewerLoop()
    requestAnimationFrame(mainLoop)

}

onMount(() => {
    mainLoop()
})

</script>

<main>

    <div id="dashboard">
        <Dashboard bind:vrmFile={vrmFile}/>
    </div>

    <div id="model-viewer">
        <ModelViewer
            rendererWidth={window.innerWidth}
            rendererHeight={window.innerHeight}
            vrmTransformation={serverVRM}
            inputCamera={serverCamera}
            vrmURL={vrmFileURL}
            bind:outputCamera={clientCamera}
            bind:animationLoop={modelViewerLoop}
        />
    </div>

</main>