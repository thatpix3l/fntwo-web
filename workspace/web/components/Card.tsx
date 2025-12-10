import type { JSX } from "solid-js";
import type * as common from "@scope/common";

interface ShadowProps {
	color?: common.css.Color;
}

interface BorderProps {
	color?: common.css.Color;
}

export interface CardProps {
	children: JSX.Element;
	shadow?: ShadowProps;
	border?: BorderProps;
	press?: boolean;
	round?: boolean;
}

/**
 * Primitive that most components use as a base; several visual options are available to change,
 * including whether to add a shadow, show a border, visually "press" the body of the card, or rounded corners.
 */
export function Card(props: CardProps) {
	return (
		<div
			class="nb-card"
			classList={{
				"nb-card-shadow": props.shadow !== undefined,
				"nb-card-border": props.border !== undefined,
				"nb-card-press": props.press === true,
				"nb-card-round": props.round === true,
			}}
		>
			<div class="nb-card-body">
				{props.children}
			</div>
		</div>
	);
}

export default Card;
