<style>
.dragged-into {
    outline: 3px dashed hsl(217,71%, 53%);
}
</style>

<script lang="ts">

let isDraggedInto: Boolean
let inputElem: HTMLInputElement

const processVRM = (vrmFile: File) => {

    fetch(`${location.origin}/api/model`, {
        method: "PUT",
        body: vrmFile
    })

}

const processDroppedVRM = (ev: DragEvent) => {
    const vrmFile = ev.dataTransfer?.files[0]
    vrmFile && processVRM(vrmFile)
}

const processUploadedVRM = (ev: Event & {currentTarget: EventTarget & HTMLInputElement}) => {
    const vrmFile = ev.currentTarget.files?.[0]
    vrmFile && processVRM(vrmFile)
}

</script>

<section class="section is-flex is-flex-direction-row">

    <div id="left-menu-pane" class="box has-background-light">

        <h1 class="title">
            Load New Model
        </h1>

        <div class="box vrm-upload-box"
            class:dragged-into={{ isDraggedInto }}
            ondragenter={() => isDraggedInto = true }
            ondragleave={() => isDraggedInto = false }
            ondrop={ev => { isDraggedInto = false; processDroppedVRM(ev) }}
            onclick={() => { inputElem.click() }}>

            <p>Drag and drop your <code>vrm</code> file, or click to manually pick!</p>
            <input onchange={processUploadedVRM} class="vrm-file-dialog" bind:this={inputElem} type="file" />

        </div>
    </div>

    <div>
    </div>

    <div id="right-menu-pane" class="box has-background-light">
        <h1 class="title">Controls</h1>

        <div class="tabs">
            <ul>
                <li id="scene-tab"><a>Scene</a></li>
                <li id="model-tab"><a>Model</a></li>
            </ul>
        </div>

        <div class="scene-tab-content">
            <button class="button is-primary">Save</button>
        </div>

    </div>

</section>