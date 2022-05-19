import * as THREE from "three";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import { GLTFNode, VRM, VRMHumanBones, VRMHumanoid, VRMSchema } from '@pixiv/three-vrm';
import CameraControls from 'camera-controls';
import * as TYPINGS from "./typings";

document.body.style.margin = "0";
document.body.style.padding = "0";

CameraControls.install({ THREE: THREE });

// WebGL Renderer
const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Scene and camera
const clock: THREE.Clock = new THREE.Clock();
const scene: THREE.Scene = new THREE.Scene();
const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, -7); // For some reason, the camera-controls library doesn't work unless I manually set the camera position

// Lighting
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(5, 20, 5);
scene.add(light);

// Camera controls
const camera_controls: CameraControls = new CameraControls(camera, renderer.domElement);
const camera_velocity: number = 0.1;

// Initial camera controls position
camera_controls.rotate(0, THREE.MathUtils.degToRad(-20));

// Keyboard input event listeners, to remove delay
let keyState = {};
document.addEventListener('keydown', (ev) => {
    keyState[ev.key] = true;
}, true);

document.addEventListener('keyup', (ev) => {
    keyState[ev.key] = false;
}, true);

// Rendering loop
const animate = () => {

    // Keyboard Controls
    if(keyState["a"]) {
        camera_controls.truck(-camera_velocity, 0, false);
    }

    if(keyState["d"]) {
        camera_controls.truck(camera_velocity, 0, false);
    }

    if(keyState["w"]) {
        camera_controls.forward(camera_velocity, false);
    }   

    if(keyState["s"]) {
        camera_controls.forward(-camera_velocity, false);
    }

    // Update camera position
    const delta = clock.getDelta();
	camera_controls.update(delta);

    // Render scene
    requestAnimationFrame(animate);

    renderer.render(scene, camera);

};
animate();

// Grid
const size = 10;
const divisions = 10;
const gridHelper = new THREE.GridHelper(size, divisions);
scene.add(gridHelper);

// Reference to character model properties we care about changing
let vrmModel: VRM;
const vrmModelBones: { [boneName: string]: GLTFNode } = {};

// Model loader
const load_model = (model_path: string) => {

    // Load model using GLTF
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(model_path, async (gltf) => {

        // Create and store VRM representation from loaded GLTF
        const new_vrm: VRM = (await VRM.from(gltf));

        vrmModel = new_vrm;
        for (const [k, v] of Object.entries(VRMSchema.HumanoidBoneName)) {
            vrmModelBones[k] = vrmModel.humanoid.getBoneNode(v);
        }

        // Add VRM to scene       
        scene.add(new_vrm.scene);

    },
        (progress) => console.log(progress),
        (error) => console.error(error));

};

// Transform position and rotation of a given GLTF node with the props of a given VRM bone 
const transform_bone = (gltf_node: GLTFNode, bone_transform: TYPINGS.payloadSingleBone) => {

    for(const key of Object.keys(bone_transform.rotation.quaternion)) {
        if(key in gltf_node.quaternion) {
            gltf_node.quaternion[key] = bone_transform.rotation.quaternion[key];
        }
    }

}

// Process and use VRM payload from a given message event
const process_vrm_payload = (ev: MessageEvent<any>) => {

    // Assume given data is of type VRMPayload
    const new_vrm: TYPINGS.vrmPayload = JSON.parse(ev.data);

    // Attempt to update bone data
    try {

        transform_bone(vrmModelBones["Head"], new_vrm.bones.head);

    } catch (e) {
        return

    }

}

// WebSocket handler for communicating with internal API for VRM transformations
const model_tracking_sock = (ws_url: string) => {

    let ws = new WebSocket(ws_url);

    ws.onopen = (ev) => {
        console.log("Connected to websocket!");
    };

    // Callback for handling VRM transformation data
    ws.onmessage = process_vrm_payload;

    ws.onclose = function (ev) {
        console.log('Socket is closed. Reconnect will be attempted in 1 second.', ev.reason);
        setTimeout(function () {
            model_tracking_sock(ws_url);
        }, 2000);
    };

    ws.onerror = function (ev) {
        console.error('Socket encountered error:', ev, 'Closing socket');
        ws.close();
    };

};

load_model("/bruh.vrm");
//load_model("/kilometers morales T-POSE.vrm");
model_tracking_sock("ws://127.0.0.1:3579/api/model");