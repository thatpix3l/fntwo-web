<style>
@import "bulma/css/bulma.css";
</style>

<script lang="ts">
    
export let success: boolean | undefined
export let disabled: boolean = false

</script>

<button class="button"
        class:is-link={success === undefined}
        class:is-primary={success === true}
        class:is-danger={success === false}
        disabled={disabled}
        on:click>
        Save Scene
</button>