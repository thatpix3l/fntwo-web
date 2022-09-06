<style>

@import "bulma-switch/dist/css/bulma-switch.min.css";

a {
    border: 1px solid rgba(0, 0, 0, 0)
}

a:hover {
    border-color: black;
}

</style>

<script lang="ts">

export let config: {[prop: string]: any} | undefined
let configPropName = ""

$: {
    if(config) {
        configPropName = Object.keys(config)[0]
        console.log(typeof config)
    }
}

</script>
    
<div class="columns">

    <div class="column">
        <aside>
            <p class="menu-label">Config Properties</p>
            <ul class="menu-list">
                {#each Object.entries(config !== undefined ? config : {}) as [title]}
                <li><a class:is-active={configPropName === title} on:click={() => {configPropName = title}}>{title}</a></li>
                {/each}
            </ul>
        </aside>
    </div>
    
    <code class="column">{config !== undefined ? config[configPropName] : ""}</code>

</div>