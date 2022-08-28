<style>
@import "bulma/css/bulma.css";
</style>

<script lang="ts">
    
export let success: boolean | undefined

</script>

<button class="button"
        class:is-link={success === undefined}
        class:is-primary={success === true}
        class:is-danger={success === false}
        disabled={success !== undefined}
        on:click>
        Save Scene
</button>