<style>

@import "bulma-checkradio/dist/css/bulma-checkradio.min.css";

</style>

<script lang="ts">

import * as helper from "lib/ts/helper"
    
export let values: string[]
export let selected: string
export let disabled: boolean = false

type option = {
    value: string
    id: string
}

const options = values.map((optionValue) => {
    return {value: optionValue, id: helper.randomID()} as option
})

</script>

{#each options as option}
<div>
    <input class="is-checkradio" id={option.id} type="radio" value={option.value} bind:group={selected} disabled={disabled}>
    <label for={option.id}>{option.value}</label>
</div>
{/each}