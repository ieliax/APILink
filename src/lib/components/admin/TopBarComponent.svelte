<script>
    import { createEventDispatcher } from "svelte";
    import { page } from "$app/stores";

    console.log($page.url.searchParams.get('id'))

    const dispatch = createEventDispatcher();
    export let action;

    console.log(action.action)
    function eventHandler(event){
        dispatch("componentEvent",{
            eventType:event.currentTarget.id,
            objectInfo: {}});
    }
</script>
<div class="topbar">
    <div class="topbar__left">s</div>
    <div class="topbar__right">
        <button class="topbar__right-dots">...</button>
        <button id="topbar__right-button" on:click={eventHandler}>{action.action != null ? action : "as"}</button>
    </div>
</div>
<style>
    * {
        font-family: Arial, Helvetica, sans-serif;
    }
    .topbar{
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 100%;
    }
    .topbar__left{
        width: 150px;
        background-color: black;
    }
    .topbar__right{
        display: grid;
        grid-template-columns: auto 1fr;
        align-items: center;
        gap: 10px;
    }
    .topbar__right-dots{
        font-weight: bold;
        font-size: 18px;
        background-color: transparent;
        color: white;
        border: none;
        cursor: pointer;
    }
    #topbar__right-button{
        height: 75%;
        width: 80px;
        border: none;
        cursor: pointer;
        border-radius: 50px;
        font-weight: bold;

    }

</style>