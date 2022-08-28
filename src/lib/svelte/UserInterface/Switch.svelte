<style>

@import "bulma-switch/dist/css/bulma-switch.min.css";

</style>

<script lang="ts">
import * as helper from "lib/ts/helper"

export let label: string
export let checked: boolean

const id = helper.randomID()

</script>

<div class="field">
    <input id={id} type="checkbox" name={id} class="switch" bind:checked>
    <label for={id}>{label}</label>
</div>