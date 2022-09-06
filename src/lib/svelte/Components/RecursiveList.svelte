<style>

@import "bulma/css/bulma.css";

</style>

<script lang="ts">
import * as helper from "lib/ts/helper"

type objectWrapper = {
    key: string
    value: any
}

type objects = {
    [key: string]: objectWrapper
}
    
export let root: {[key: string]: any}
export let selected: string = ""
export let value: any

let branches: objects = {}
Object.entries(root).map(([key, value]) => {
    branches[helper.randomID()] = {
        key: key,
        value: value
    }
})

$: {
    if(branches[selected] && typeof branches[selected].value !== "object") {
        value = branches[selected].value
    }
}

</script>
    
<ul class="menu-list">
    {#each Object.entries(branches) as [id, branch]}
    <li>
        <a class:is-active={selected === id} on:click={() => {selected = id}}>{branch.key}</a>
        {#if typeof branch.value === "object"}
            <svelte:self root={branch.value} bind:selected bind:value/>
        {/if}
    </li>
    {/each}
</ul>
