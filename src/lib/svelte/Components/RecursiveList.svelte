<style>

@import "bulma/css/bulma.css";

</style>

<script lang="ts">

import * as helper from "lib/ts/helper"

type rootObject = {
    [key: string]: any
}

export let root: rootObject
export let value: any
export let selectedID: string = ""

// Given an object, return a 2D array pair of unique ID and associated key within the object
const generateKeyIDs = (rootObj: rootObject) => {
    return Object.keys(rootObj).map(key => {
        return [helper.randomID(), key]
    })
}

let keyIDMappings: string[][] = []
$: {

    // Every time the root object is refreshed and has a different length,
    // update the 2D array of id-to-key mappings
    const newMappings = generateKeyIDs(root)
    if(keyIDMappings.length !== newMappings.length) {
        keyIDMappings = newMappings
    }
    
    // Every time the mappings are updated and an item has been selected from this depth, change prop value
    for(const [id, key] of keyIDMappings) {
        if(selectedID === id && typeof root[key] !== "object") {
            value = root[key]
        }
    }

}

</script>
    
<ul class="menu-list">
    {#each keyIDMappings as [id, key]}
    <li>
        <a class:is-active={selectedID === id} on:click={() => {selectedID = id}}>{key}</a>

        {#if typeof root[key] === "object"}
            <svelte:self root={root[key]} bind:value bind:selectedID/>
        {/if}

    </li>
    {/each}
</ul>
