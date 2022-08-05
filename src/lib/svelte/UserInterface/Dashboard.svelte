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
import { ActionsList } from "lib/ts/api";

import type { AppConfig, ClientConfig, SceneConfig } from "lib/ts/models/config";
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
let controlTab: string = "Model"

let configPropName: string = ""

const updateSceneStatus = () => {
    actions.SaveScene.status.success = actions.SaveScene.status.success
}

actions.SaveScene.userCallback = updateSceneStatus
actions.SaveScene.failureCallback = updateSceneStatus
actions.SaveScene.resetCallback = updateSceneStatus

</script>



<section id="ui" class="section is-flex is-flex-direction-row">

    <div class="box has-background-light">

        <h1 class="title">
            Status
        </h1>

        <Tabs tabNames={["App", "Scene"]} bind:currentTab={statusTab}/>

        {#if statusTab === "App"}

        <div class="columns">

            <div class="column">
                <aside>
                    <p class="menu-label">Config Properties</p>
                    <ul class="menu-list">
                        {#each Object.entries(appConfig !== undefined ? appConfig : {}) as [title]}
                        <li><a class:is-active={configPropName === title} on:click={() => {configPropName = title}}>{title}</a></li>
                        {/each}
                    </ul>
                </aside>
            </div>

            <code class="column">{appConfig !== undefined ? appConfig[configPropName] : ""}</code>

        </div>

        {:else if statusTab === "Scene"}
        <div></div>
        {/if}

    </div>

    <div class="empty-space">
    </div>

    <div class="box has-background-light">
        <h1 class="title">Controls</h1>

        <Tabs tabNames={["Model", "Scene"]} bind:currentTab={controlTab}></Tabs>

        {#if controlTab === "Scene"}

        <button class="button"
        class:is-link={actions.SaveScene.status.success === undefined}
        class:is-primary={actions.SaveScene.status.success === true}
        class:is-danger={actions.SaveScene.status.success === false}
        on:click={() => actions.SaveScene.run()}>Save Scene</button>

        <div>
            <Switch label="Grid" bind:checked={clientConfig.show_grid} />
            <Switch label="Track Face" bind:checked={clientConfig.track_face} />
        </div>

        {:else if controlTab === "Model"}

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