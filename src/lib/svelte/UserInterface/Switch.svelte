<style>

@import "bulma-switch/dist/css/bulma-switch.min.css";

</style>

<script lang="ts">

export let label: string
export let checked: boolean

</script>

<div class="field">
    <input id={label} type="checkbox" name={label} class="switch" bind:checked>
    <label for={label}>{label}</label>
</div>