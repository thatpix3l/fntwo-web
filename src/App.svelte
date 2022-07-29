<script lang="ts">

import { onMount } from "svelte";

import ModelViewer from "./lib/svelte/ModelViewer/ModelViewer.svelte"

import type * as object from "./lib/ts/models/object"
import * as helper from "lib/ts/helper"

let vrmURL: string = `${location.origin}/api/model`
let serverVRM: object.VRM | undefined
let serverCamera: object.Camera | undefined
let clientCamera: object.Camera

const wsBaseURL = location.protocol === "https:" ? "wss://"+location.host : "ws://"+location.host

// Auto-connect to and read server camera
const serverCamSock = new helper.ReconnectableWebSocket("server camera", wsBaseURL+"/client/camera", 1000, ev => {
    serverCamera = JSON.parse(ev.data)
});

// Relay the model viewer's camera state to backend server
const sendCamera = (camera: object.Camera) => {
    serverCamSock.Send(JSON.stringify(camera))
}

$: {
    sendCamera(clientCamera)
}

// Auto-connect to and read server VRM
const serverVRMSock = new helper.ReconnectableWebSocket("server vrm", wsBaseURL+"/client/model", 1000, ev => {
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
    <ModelViewer
    rendererWidth={window.innerWidth}
    rendererHeight={window.innerHeight}
    vrmTransformation={serverVRM}
    inputCamera={serverCamera}
    vrmURL={vrmURL}
    bind:outputCamera={clientCamera}
    bind:animationLoop={modelViewerLoop}
    />
</main>