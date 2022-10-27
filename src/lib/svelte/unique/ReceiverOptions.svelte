<script lang="ts">
import RadioButtons from "lib/svelte/generic/RadioButtons.svelte"

import * as api from "lib/ts/api"

// Available receivers to switch between from API server; does not change during runtime
let serverReceiver: api.receiver
let suggestedReceiver: string

$: {
    (async () => {
        if(serverReceiver === undefined && suggestedReceiver === undefined) {
            serverReceiver = await api.GetReceiver()
            suggestedReceiver = serverReceiver.active

        } else if(serverReceiver !== undefined && suggestedReceiver !== serverReceiver.active) {
            await api.SetReceiver(suggestedReceiver)
            serverReceiver = await api.GetReceiver()
            suggestedReceiver = serverReceiver.active
        }
    })()
}
</script>

<div>
    {#if serverReceiver}
    <p>Active Receiver</p>
    <div class="is-vcentered">
        <RadioButtons values={serverReceiver.available} bind:selected={suggestedReceiver} />
    </div>
    {/if}
</div>
