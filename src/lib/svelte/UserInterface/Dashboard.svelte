<style>

@import "bulma/css/bulma.css";

#ui {
    align-items: flex-start;
}

.vrm-upload-box {
    aspect-ratio: 1/1;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}

.vrm-file-dialog {
    display: none;
}

.dragged-into {
    outline: 3px dashed hsl(217, 71%, 53%);
}

.section > *{
    flex: 1 1 0px;
}

</style>

<script lang="ts">
import { ActionsList, type receiverInfo } from "lib/ts/api";

import type { AppConfig, ClientConfig, SceneConfig } from "lib/ts/models/config";
import Button from "./Button.svelte";
import ConfigViewer from "./ConfigViewer.svelte";
import RadioButtons from "./RadioButtons.svelte";
import Switch from "./Switch.svelte";
import Tabs from "./Tabs.svelte";

export let vrmFile: File | undefined
export let sceneConfig: SceneConfig
export let appConfig: AppConfig | undefined
export let clientConfig: ClientConfig

const actions = new ActionsList()

let isDraggedInto: Boolean
let inputElem: HTMLInputElement

const processVRM = (file: File) => {

    vrmFile = file

}

const processDroppedVRM = (ev: DragEvent) => {
    const file = ev.dataTransfer?.files[0]
    file && processVRM(file)
}

const processUploadedVRM = (ev: Event & {currentTarget: EventTarget & HTMLInputElement}) => {
    const file = ev.currentTarget.files?.[0]
    file && processVRM(file)
}

// Current tab name for backend status. Default is app
let statusTab: string = "App"

// Current tab name for controls. Default is model.
let controlsTab: string = "Model"

let configPropName: string = ""
$: {
    if(appConfig) {
        configPropName = appConfig[Object.keys(appConfig)[0]]
    }
}

const updateSceneStatus = () => {
    actions.SaveScene.status.success = actions.SaveScene.status.success
}

actions.SaveScene.userCallback = updateSceneStatus
actions.SaveScene.failureCallback = updateSceneStatus
actions.SaveScene.resetCallback = updateSceneStatus

let receiverInfo: receiverInfo
let selectedReceiver: string

const updateReceiversList = async () => {
    receiverInfo = await actions.GetReceiver()
}; updateReceiversList()

$: {
    (async () => {
        if(appConfig && appConfig.receiver !== selectedReceiver) {
            appConfig.receiver = selectedReceiver
            await actions.SetReceiver(appConfig.receiver)
            await updateReceiversList()
        }
    })()
}

</script>



<section id="ui" class="section is-flex is-flex-direction-row">

    <div class="box has-background-light">

        <h1 class="title">
            Status
        </h1>

        <Tabs tabNames={["App", "Scene"]} bind:currentTab={statusTab}/>

        {#if statusTab === "App"}
        <ConfigViewer config={appConfig} />
        {:else if statusTab === "Scene"}
        <ConfigViewer config={sceneConfig}/>
        {/if}

    </div>

    <div class="empty-space">
    </div>

    <div class="box has-background-light">
        <h1 class="title">Controls</h1>

        <Tabs tabNames={["Model", "Scene"]} bind:currentTab={controlsTab}></Tabs>

        {#if controlsTab === "Scene"}

        <Button success={actions.SaveScene.status.success} on:click={actions.SaveScene.run}/>

        <div>
            <Switch label="Grid" bind:checked={clientConfig.show_grid} />
            <Switch label="Track Face" bind:checked={clientConfig.track_face} />
            {#if receiverInfo.active}
            <RadioButtons values={[...receiverInfo.available]} bind:selected={selectedReceiver} />
            {/if}
        </div>

        {:else if controlsTab === "Model"}

        <div id="model-tab-content">

            <div class="box vrm-upload-box"
                class:dragged-into={ isDraggedInto }
                on:dragenter={() => isDraggedInto = true }
                on:dragleave={() => isDraggedInto = false }
                on:drop={ev => { isDraggedInto = false; processDroppedVRM(ev) }}
                on:click={() => { inputElem.click() }}>

                <p>Drag and drop your <code>vrm</code> file, or click to manually pick!</p>
                <input on:change={processUploadedVRM} class="vrm-file-dialog" bind:this={inputElem} type="file" />

            </div>

        </div>

        {/if}

    </div>

</section>