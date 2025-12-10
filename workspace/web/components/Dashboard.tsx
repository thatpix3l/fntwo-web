import { createSignal, type Signal } from "solid-js";
import { Card } from "./Card.tsx";

interface Props {
	fovSignal: Signal<number>;
	nearSignal: Signal<number>;
	farSignal: Signal<number>;
}

/**
 * Control center for changing settings of the current scene,
 * (un)loading `VRM` models, saving, loading, etc.
 */
export default function (props: Props) {
	const [fov, setFov] = props.fovSignal;
	const [near, setNear] = props.nearSignal;
	const [far, setFar] = props.farSignal;

	console.log(fov, setFov, near, setNear, far, setFar);

	const [_press, _setPress] = createSignal(false);

	return (
		<div class="dashboard">
			<Card border={{}} round>
				<div style={{ "display": "flex", "flex-direction": "row" }}>
					<p>bruh</p>
					<p>moment</p>
				</div>
			</Card>
		</div>
	);
}
