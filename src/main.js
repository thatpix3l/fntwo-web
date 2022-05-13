import * as THREE from "three";
import { MathUtils } from "three";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

// Scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
camera.position.y = 3;

camera.rotation.y = MathUtils.degToRad(-30);
camera.rotation.x = MathUtils.degToRad(-20);

// Animation rendering loop
var renderer = new THREE.WebGLRenderer( { alpha: true, antialias: true } );
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
function animate() {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
};

animate();

// Grid
const size = 10;
const divisions = 10;
const gridHelper = new THREE.GridHelper(size, divisions);
scene.add(gridHelper);

// Kilometers Morales
const gltfLoader = new GLTFLoader();
gltfLoader.load("/kilometers morales project.glb", (gltf) => {
    const root = gltf.scene;
    scene.add(root);
});