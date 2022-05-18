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
camera.position.set(0, 0, -7);

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

// Model loader
const load_model = (model_path: string) => {

    // Load model using GLTF
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(model_path, async (gltf) => {

        // Create and store VRM representation from loaded GLTF
        const new_vrm: VRM = (await VRM.from(gltf));

        vrmModel = new_vrm;

        // Add VRM to scene       
        scene.add(new_vrm.scene);

    },
        (progress) => console.log(progress),
        (error) => console.error(error));

};

const model_tracking_sock = (ws_url: string) => {

    let ws = new WebSocket(ws_url);

    ws.onopen = (ev) => {
        console.log("Connected to websocket!");
    };

    // Transform model according to what was just received from backend
    ws.onmessage = (ev) => {
        const new_vrm_payload: TYPINGS.VRMPayload = JSON.parse(ev.data);
        const payload_key: string = new_vrm_payload.name;
        const payload_type: string = new_vrm_payload.payload_type;
        const payload_bone: TYPINGS.bone = new_vrm_payload.bones[payload_key];

        const current_bone = vrmModel.humanoid.getBoneNode(VRMSchema.HumanoidBoneName[payload_key]);

        if (current_bone === null) {
            console.log("Bone " + payload_key + " is missing");
            return
        }

        /*
        current_bone.position.x = new_vrm_payload.bones.Head.position_x;
        current_bone.position.y = new_vrm_payload.bones.Head.position_y;
        current_bone.position.z = new_vrm_payload.bones.Head.position_z;
        */

        current_bone.quaternion.x = payload_bone.quaternion_x;
        current_bone.quaternion.y = payload_bone.quaternion_y;
        current_bone.quaternion.z = payload_bone.quaternion_z;
        current_bone.quaternion.w = payload_bone.quaternion_w;

        console.log(current_bone);

    };

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

load_model("/kilometers morales T-POSE.vrm");
load_model("/bruh.vrm");
model_tracking_sock("ws://127.0.0.1:3579/api/model");