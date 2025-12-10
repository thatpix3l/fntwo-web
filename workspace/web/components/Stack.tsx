import { children, createEffect, type JSX } from "solid-js";

interface Props {
	children: JSX.Element[];
}

function isHtmlElement(arg: JSX.Element): arg is HTMLElement {
	return arg instanceof HTMLElement;
}

/**
 * Layer elements over each other.
 */
export default function (props: Props) {
	const c = children(() => props.children);

	createEffect(() => {
		const resolved = c();
		if (!Array.isArray(resolved)) {
			return;
		}

		let depth = 0;
		resolved.filter(isHtmlElement).findLast((elem) => {
			elem.style.zIndex = (depth++).toString();
		});
	});

	return (
		<div class="stack">
			{c()}
		</div>
	);
}
