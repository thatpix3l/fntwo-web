import { createSignal } from "solid-js";
import ModelViewer from "./ModelViewer.tsx";
import Dashboard from "./Dashboard.tsx";
import Stack from "./Stack.tsx";

function getWindowSize() {
	return {
		width: globalThis.innerWidth,
		height: globalThis.innerHeight,
	};
}

function App() {
	const [windowSize, setWindowSize] = createSignal(getWindowSize());
	const [modelBuf, setModelBuf] = createSignal(
		undefined as ArrayBuffer | undefined,
	);
	const [fov, setFov] = createSignal(70);
	const [near, setNear] = createSignal(0.01);
	const [far, setFar] = createSignal(10);

	fetch("/api/model").then((resp) => resp.arrayBuffer()).then((buf) =>
		setModelBuf(buf)
	);

	globalThis.addEventListener(
		"resize",
		(_) => setWindowSize(getWindowSize()),
		true,
	);

	return (
		<div class="app">
			<Stack>
				<Dashboard
					fovSignal={[fov, setFov]}
					nearSignal={[near, setNear]}
					farSignal={[far, setFar]}
				/>
				<ModelViewer
					getSize={windowSize}
					getModelBuf={modelBuf}
					getFov={fov}
					getNear={near}
					getFar={far}
				/>
			</Stack>
		</div>
	);
}

export default App;
