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
	/**
	 * Assign empty object for default shadow styling.
	 */
	shadow?: ShadowProps;

	/**
	 * Assign empty object for default border styling.
	 */
	border?: BorderProps;

	/**
	 * Whether the card should look pressed.
	 */
	press?: boolean;

	/**
	 * Whether the cornders should be rounded.
	 */
	round?: boolean;
}

/**
 * Primitive that most components use as a base.
 *
 * Can modify the shadow, border, "press" state, rounded corners, etc.
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
