<style>

#dashboard {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 1;
}

.transition-filter {
    transition: filter .2s;
}

.blur {
    filter: blur(4px);
}

</style>

<script lang="ts">

import { onMount } from "svelte";

import ModelViewer from "./lib/svelte/ModelViewer/ModelViewer.svelte"

import type * as object from "lib/ts/models/object"
import * as api from "lib/ts/api"
import * as helper from "lib/ts/helper"
import Dashboard from "lib/svelte/UserInterface/Dashboard.svelte"
import { SceneConfig, ClientConfig, type AppConfig } from "lib/ts/models/config"

let vrmFile: File | undefined
let vrmFileURL: string = `${location.origin}/api/model`
let serverVRM: object.VRM
let serverCamera: object.Camera
let clientCamera: object.Camera
let appConfig: AppConfig
let sceneConfig = new SceneConfig()
let clientConfig = new ClientConfig()

// let faceLandmarks: NormalizedLandmarkList

fetch("/api/config/app").then(resp => resp.json()).then(data => appConfig = data)
fetch("/api/config/scene").then(resp => resp.json()).then(data => sceneConfig = data)

const updateVRM = async (file: File | undefined) => {
    if(file) {
        await api.SetVRM(file)
        vrmFileURL = URL.createObjectURL(await api.GetVRM())
    }
}

$: {
    updateVRM(vrmFile)
}

const wsHostURL = location.protocol === "https:" ? "wss://"+location.host : "ws://"+location.host
const wsHostnameURL = window.location.protocol === "https:" ? "ws://"+window.location.hostname : "ws://"+window.location.hostname

// Auto-connect to readable server camera
const cameraReadWS = new helper.ReconnectableWebSocket("readable server camera", `${wsHostURL}/live/read/camera`, 1000, ev => {
    serverCamera = JSON.parse(ev.data)
}); cameraReadWS

// Auto-connect and write to server camera socket
const cameraWriteWS = new helper.ReconnectableWebSocket("writable server camera", `${wsHostURL}/live/write/camera`, 1000, ev => {})
$: {
    cameraWriteWS.Send(JSON.stringify(clientCamera))
}

// Auto-connect and write to Mediapipe landmarks receiver socket
// const mediapipeWS = new helper.ReconnectableWebSocket("writable mediapipe receiver", `${wsHostnameURL}:2332`, 1000, ev => {})
// $: {
//     mediapipeWS.Send(JSON.stringify(faceLandmarks))
// }

// Auto-connect to and read server VRM
const serverVRMSock = new helper.ReconnectableWebSocket("readable server VRM", `${wsHostURL}/live/read/model`, 1000, ev => {
    serverVRM = JSON.parse(ev.data)
}); serverVRMSock

const keyListener = new helper.KeyListener()

// Toggle for grid
const gridToggle = new helper.Toggle(() => clientConfig.show_grid = !clientConfig.show_grid)
keyListener.OnPress("g", () => gridToggle.Run())
keyListener.OnRelease("g", () => gridToggle.Enable())

// Toggle for face tracking
const faceTrackToggle = new helper.Toggle(() => clientConfig.track_face = !clientConfig.track_face)
keyListener.OnPress("t", () => faceTrackToggle.Run())
keyListener.OnRelease("t", () => faceTrackToggle.Enable())

// Toggle for the Dashboard
let showUI: Boolean = false

const uiToggle = new helper.Toggle(() => showUI = !showUI)
keyListener.OnPress("Escape", () => uiToggle.Run() )
keyListener.OnRelease("Escape", () => { uiToggle.Enable() })

let modelViewerLoop: () => any

const mainLoop = () => {

    keyListener.Run()
    modelViewerLoop()
    requestAnimationFrame(mainLoop)

}

onMount(() => {
    mainLoop()
})

let innerWidth = 0
let innerHeight = 0

</script>

<svelte:window bind:innerWidth bind:innerHeight />

<main>

    {#if showUI}
    <div id="dashboard">
        <Dashboard appConfig={appConfig} sceneConfig={sceneConfig} bind:clientConfig bind:vrmFile/>
    </div>
    {/if}

    <div id="model-viewer" class="transition-filter" class:blur={showUI}>
        <ModelViewer
            rendererWidth={innerWidth}
            rendererHeight={innerHeight}
            vrmTransformation={serverVRM}
            inputCamera={serverCamera}
            vrmFileURL={vrmFileURL}
            clientConfig={clientConfig}
            bind:outputCamera={clientCamera}
            bind:animationLoop={modelViewerLoop}
        />
    </div>

    <!--
    <Mediapipe bind:faceLandmarks bind:clientConfig/>
    -->

</main>
