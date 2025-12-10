import {
	type Accessor,
	createEffect,
	createSignal,
	type Signal,
} from "solid-js";
import * as three from "three/webgpu";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { type GLTF, GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import {
	MToonMaterialLoaderPlugin,
	VRM,
	VRMLoaderPlugin,
	VRMUtils,
} from "@pixiv/three-vrm";
import { MToonNodeMaterial } from "@pixiv/three-vrm/nodes";

type Numbers<Keys extends string> = {
	[K in Keys]: number;
};

type Size = Numbers<"width" | "height">;

interface Props {
	getSize: Accessor<Size>;
	getModelBuf: Accessor<ArrayBuffer | undefined>;
	getFov: Accessor<number>;
	getNear: Accessor<number>;
	getFar: Accessor<number>;
	externalResourcesPath?: string | undefined;
}

/**
 * Remove and cleanup a model.
 * @param scene - Parent scene that contains model as a child.
 * @param model - Model to remove.
 */
function pruneModel(
	scene: three.Scene<three.Object3DEventMap>,
	model: VRM | undefined,
) {
	if (model === undefined) {
		return;
	}

	scene.remove(model.scene);
	VRMUtils.deepDispose(model.scene);
}

/**
 * @param scene - Scene to contain model.
 * @param gltf -  Parsed model instance.
 * @param modelSignal - Signal to retrieve and store the currently active model.
 * @returns
 */
function initModel(
	scene: three.Scene<three.Object3DEventMap>,
	gltf: GLTF,
	modelSignal: Signal<VRM | undefined>,
) {
	const vrm = gltf.userData.vrm;

	if (!(vrm instanceof VRM)) {
		return;
	}

	// Calling these functions greatly improves the performance.
	VRMUtils.removeUnnecessaryVertices(gltf.scene);
	VRMUtils.combineSkeletons(gltf.scene);
	VRMUtils.combineMorphs(vrm);

	// Disable frustum culling.
	vrm.scene.traverse((obj) => obj.frustumCulled = false);

	const [getModel, setModel] = modelSignal;

	// Remove active model.
	pruneModel(scene, getModel());

	// Add new model.
	scene.add(vrm.scene);

	// Rotate if the VRM is `VRM0.0`.
	VRMUtils.rotateVRM0(vrm);

	// Store reference to model.
	setModel(vrm);
}

/**
 * Viewer for `VRM` models.
 */
export default function (props: Props) {
	// Create scene root that will hold everything.
	const scene = new three.Scene();

	// Configure renderer.
	const renderer = new three.WebGPURenderer({ antialias: true });
	createEffect(() =>
		renderer.setSize(props.getSize().width, props.getSize().height)
	);

	// Set animation loop.
	renderer.setAnimationLoop((_time) => renderer.render(scene, camera));

	// Configure camera.
	const camera = new three.PerspectiveCamera(
		70,
		props.getSize().width / props.getSize().height,
		0.01,
		10,
	);
	camera.position.z = 1;
	const cameraEffects = [
		() => {
			camera.aspect = props.getSize().width / props.getSize().height;
			camera.fov = props.getFov();
			camera.near = props.getNear();
			camera.far = props.getFar();
		},
	];

	for (const effect of cameraEffects) {
		createEffect(effect);
	}

	// Configure camera controls.
	const controls = new OrbitControls(camera, renderer.domElement);
	controls.screenSpacePanning = true;
	controls.target.set(0.0, 1.0, 0.0);
	controls.update();

	// Create a GLTFLoader.
	const loader = new GLTFLoader();

	// Register a VRMLoaderPlugin.
	loader.register((parser) => {
		// Create a WebGPU compatible MToonMaterialLoaderPlugin.
		const mtoonMaterialPlugin = new MToonMaterialLoaderPlugin(parser, {
			// Set the material type to MToonNodeMaterial.
			materialType: MToonNodeMaterial,
		});

		return new VRMLoaderPlugin(parser, {
			// Specify the MToonMaterialLoaderPlugin to use in the VRMLoaderPlugin instance.
			mtoonMaterialPlugin,
		});
	});

	const modelSignal = createSignal(undefined as VRM | undefined);

	createEffect(() => {
		const modelBuf = props.getModelBuf();
		if (modelBuf === undefined) {
			return;
		}

		loader.parseAsync(modelBuf, "/api/model").then((parsed) =>
			initModel(scene, parsed, modelSignal)
		);
	});

	return renderer.domElement;
}
