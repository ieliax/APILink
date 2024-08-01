<script>
    import { onMount, onDestroy } from "svelte";
    import { browser } from "$app/environment";

    export let isOpen = false;
    export let close;
  
</script>

{#if isOpen}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="modal-backdrop" on:click={close}>
        <div class="modal-content" on:click|stopPropagation>
            <!-- <slot></slot>  -->
            <!-- <button on:click={close}>Close</button> -->
            <div class="topbar">
                <button on:click={close}>close</button>
                <p>Create Product</p>
                <button>publicar</button>
            </div>
            
        </div>
    </div>
{/if}

<style>
    .modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5); /* Fondo semitransparente */
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 999; /* Asegúrate de que el modal esté sobre otros elementos */
    }

    .modal-content {
        flex: 1;
        background-color: red;
        height: 100%;
        overflow-y: auto;
    }

    .topbar {
        /* flex: 1;
        display: flex;
        background-color: rebeccapurple;
        height: 60px;
        justify-content: center;
        align-items: center; */
        display: grid;
        position: sticky;
        top: 0;
        grid-template-columns: 0.1fr 1fr 0.1fr;
        background-color: rebeccapurple;
        height: 60px;
    }
    .topbar p {
        background-color: red;
        text-align: center;
    }
    .topbar button {
        width: 60px;
        background-color: greenyellow;
    }

    /* 
    .modal-content {
        background: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        position: relative; 
    } */

    /* button {
        position: absolute;
        top: 10px;
        left: 10px;
        cursor: pointer;
    } */
</style>
