import { Card, type CardProps } from "./Card.tsx";
import type { StrictOmit } from "@scope/common";

interface ProgressProps {
	max: number;
	value: number;
	cardProps?: StrictOmit<CardProps, "children">;
}

/**
 * A progress bar, but stylish!
 */
function Progress(props: ProgressProps) {
	return (
		<Card {...props.cardProps}>
			<progress class="nb-progress" max={props.max} value={props.value} />
		</Card>
	);
}

export { Progress };
