import { render } from "solid-js/web";
import { Component } from 'solid-js';
import "./App.css";

export function start() {
    const ui_root = document.getElementById("ui_root")!;
    const HelloMessage: Component<{name: string}> = ({name}) => <h1>Hello, {name}</h1>;

render(() => <HelloMessage name="World"/>, ui_root);
};