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
let sceneConfig: SceneConfig
let clientConfig = new ClientConfig()

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

// Auto-connect to readable server camera
const cameraReadWS = new helper.ReconnectableWebSocket("readable server camera", `${wsHostURL}/live/read/camera`, 1000, ev => {
    serverCamera = JSON.parse(ev.data)
}); cameraReadWS

// Auto-connect to writable server camera
const cameraWriteWS = new helper.ReconnectableWebSocket("writable server camera", `${wsHostURL}/live/write/camera`, 1000, ev => {})
$: {
    clientCamera !== undefined && cameraWriteWS.Send(JSON.stringify(clientCamera))
}

// Auto-connect to readable app config
const appConfigReadWS = new helper.ReconnectableWebSocket("readable app config", `${wsHostURL}/live/read/config/app`, 1000, ev => {
    appConfig = JSON.parse(ev.data)
}); appConfigReadWS

// Auto-connect to readable scene config
const sceneConfigReadWS = new helper.ReconnectableWebSocket("readable scene config", `${wsHostURL}/live/read/config/scene`, 1000, ev => {
    sceneConfig = JSON.parse(ev.data)
}); sceneConfigReadWS

// Auto-connect to and read server VRM
const vrmReadWS = new helper.ReconnectableWebSocket("readable server VRM", `${wsHostURL}/live/read/model`, 1000, ev => {
    serverVRM = JSON.parse(ev.data)
}); vrmReadWS

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
