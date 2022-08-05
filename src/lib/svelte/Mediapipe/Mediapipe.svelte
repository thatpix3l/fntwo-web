<script lang="ts">
import { FaceMesh, type InputMap, type NormalizedLandmarkList, type Results } from "@mediapipe/face_mesh"
import { onMount } from "svelte";
import type { ClientConfig } from "lib/ts/models/config";
import { Camera } from "@mediapipe/camera_utils";

export let faceLandmarks: NormalizedLandmarkList
export let clientConfig: ClientConfig

let videoElem: HTMLVideoElement

let camera: Camera

$: {

    if(camera) {
        if(clientConfig.track_face) {

            camera.start().catch(() => clientConfig.track_face = false)

        } else {

            camera.stop()

        }
    }

}

const faceMesh = new FaceMesh({locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`
}})

faceMesh.setOptions({
    maxNumFaces: 1,
    refineLandmarks: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
})

faceMesh.onResults((results: Results) => {

    if(results.multiFaceLandmarks) {

        faceLandmarks = results.multiFaceLandmarks[0]

    }

})

onMount(() => {
    
    camera = new Camera(videoElem, {
        onFrame: async () => {
            await faceMesh.send({image: videoElem})
        },
        width: 1280,
        height: 720
    })

})

</script>

<video bind:this={videoElem} width="1280px" height="720px" style="display: none;" />