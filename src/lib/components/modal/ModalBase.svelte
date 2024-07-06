<script>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    function closeModal(){
        // console.log(event.detail.eventType)
         dispatch("componentEvent",{eventType:"close"});
    }

</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="modal-overlay" on:click={closeModal}>
    <div class="modal-container">
        <div class="modal-content">
            <slot></slot>
        </div>
    </div>
</div>

<style>
    .modal-overlay {
        display: flex;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        /* background-color: rgba(255, 255, 255, 0.7); */
        background-color: rgba(0, 0, 0, 0.767);
        z-index: 1000;
        align-items: center;
    }

    .modal-container {
        background-color: #2f2f2f;
        border-radius: 10px;
        margin: 0 auto;
        overflow-y: auto;
    }
    .modal-content {
        display: grid;
        grid-template-rows: .1fr auto auto;
        width: 350px;
        margin: 20px;
        overflow-y: auto;
        gap: 20px;
    }

</style>
