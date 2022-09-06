<script lang="ts">
import * as mpFaceMesh from "@mediapipe/face_mesh"
import { onMount } from "svelte";
import type { Client } from "lib/ts/models/config";
import * as mpCamera from "@mediapipe/camera_utils";

export let faceLandmarks: mpFaceMesh.NormalizedLandmarkList
export let clientConfig: Client

let videoElem: HTMLVideoElement

let camera: mpCamera.Camera

$: {

    if(camera) {
        if(clientConfig.track_face) {

            camera.start().catch(() => clientConfig.track_face = false)

        } else {

            camera.stop()

        }
    }

}

const faceMesh = new mpFaceMesh.FaceMesh({locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`
}})

faceMesh.setOptions({
    maxNumFaces: 1,
    refineLandmarks: false,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
})

faceMesh.onResults((results: mpFaceMesh.Results) => {

    if(results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {

        faceLandmarks = results.multiFaceLandmarks[0]

    }

})

onMount(() => {
    
    camera = new mpCamera.Camera(videoElem, {
        onFrame: async () => {
            await faceMesh.send({image: videoElem})
        },
        width: 1280,
        height: 720
    })

})

</script>

<video bind:this={videoElem} width="1280px" height="720px" style="display: none;" />