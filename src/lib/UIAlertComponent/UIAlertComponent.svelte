<script>
    import { createEventDispatcher } from "svelte";
    import UIRegisterComponent from "./UIRegisterComponent.svelte";

    const dispatch = createEventDispatcher();

    function eventHandler(event){
        // console.log(event.detail.eventType)
        dispatch("componentEvent",event.detail)
    }

</script>

<div class="general">
    <UIRegisterComponent on:componentEvent={eventHandler}/>
</div>

<style>
    .general {
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

</style>
