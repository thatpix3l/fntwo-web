<style>

@import "bulma/css/bulma.css";

</style>

<script lang="ts">

export let value: any

</script>

<div class="columns box">

    <div class="column">
        <slot></slot>
    </div>
    
    <code class="column">{value}</code>

</div>