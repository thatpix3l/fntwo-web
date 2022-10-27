<style>
@import "bulma/css/bulma.css";
</style>

<script lang="ts">
export let tabNames: string[]
export let currentTab: string = tabNames[0]

</script>

<div class="tabs">
    <ul>
        {#each tabNames as tabName}
        <li class:is-active={currentTab === tabName}><a on:click={() => currentTab = tabName}>{tabName}</a></li>
        {/each}
    </ul>
</div>