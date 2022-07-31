<style>

@import "bulma/css/bulma.css";

:root {
    --ui-show-duration: 250ms;
    --ui-hide-duration: var(--ui-show-duration);
}

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

export let vrmFile: File | undefined

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

// Current tab name. Default is model
let currentTab: string = "model"

</script>

<section id="ui" class="section is-flex is-flex-direction-row">

    <div class="box has-background-light">

        <h1 class="title">
            Status
        </h1>

    </div>

    <div class="empty-space">
    </div>

    <div class="box has-background-light">
        <h1 class="title">Controls</h1>

        <div class="tabs">
            <ul>
                <li class:is-active={currentTab === "model"}><a on:click={() => currentTab = "model"}>Model</a></li>
                <li class:is-active={currentTab === "scene"}><a on:click={() => currentTab = "scene"}>Scene</a></li>
            </ul>
        </div>

        {#if currentTab === "scene"}

        <div>
            <button class="button is-primary">Save</button>
        </div>

        {:else if currentTab === "model"}

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