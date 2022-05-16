import * as THREE from "three";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import { VRM } from '@pixiv/three-vrm'

// Scene and camera
const scene: THREE.Scene = new THREE.Scene();
const camera: THREE.Camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.z = 5;
camera.position.y = 3;

camera.rotation.y = THREE.MathUtils.degToRad(-20);
camera.rotation.x = THREE.MathUtils.degToRad(-20);

// Animation rendering loop
const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer( { alpha: true, antialias: true } );

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const animate = () => {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
};

animate();

// Grid
const size = 10;
const divisions = 10;
const gridHelper = new THREE.GridHelper(size, divisions);
scene.add(gridHelper);

let characterModelBones: Map<String, THREE.Object3D> = new Map();

// Async model loader
const load_model = async (model_path: string) => {

    // GLTF loader that VRM files are based off of
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(model_path, async (gltf) => {

        const root: THREE.Scene | THREE.Group = (await VRM.from(gltf)).scene;
        console.log((await VRM.from(gltf)));

        root.traverse((child) => {

            if (child.type === "Bone") {
                characterModelBones.set(child.name, child);
            }

        });

        console.log(characterModelBones);

        scene.add(root);
    },
    (progress) => console.log("Loading model...", 100.0 * ( progress.loaded / progress.total ), '%' ),
    (error) => console.error(error));

};

load_model("/kilometers morales T-POSE.vrm");