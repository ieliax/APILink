<script>
    import { createEventDispatcher } from "svelte";
    import UIAlertComponent from "../UIAlertComponent/UIAlertComponent.svelte";

    export let objectList;

    const dispatch = createEventDispatcher();

    function handleClick(event, index) {
        dispatch("componentEvent", {
            eventType: event.target.id,
            indexCell:index,
            cellInfo:{indexPath:index}
        });
        // console.log(index);
    }
</script>

<div id="main">
    {#if true}
        <!-- <UIAlertComponent /> -->
    {/if}
    <div id="general">
        <button id="button" on:click={handleClick}>create</button>
        <section id="content">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            {#each objectList as list, index}
                <div id="cell" on:click={(event) => handleClick(event, index)}>
                    {list.document.pagename}
                </div>
            {/each}
        </section>
    </div>
</div>

<style>
    * {
        font-family: Helvetica, sans-serif;
        font-size: 15px;
        /* margin: 5px; */
    }
    #general {
        display: grid;
        grid-template-rows: 0.1fr 1fr;
        /* background-color: #eee; */
        height: 100vh;
        overflow-y: auto;
    }

    button {
        /* display: flex; */
        color: black;
        position: sticky;
        top: 0;
        margin: 10px;
        padding: 15px;
        background-color: white;
        border: none;
        border-radius: 10px;
        cursor: pointer;
        font-weight: bold;
    }

    #cell {
        /* border: 1px solid #ccc; */
        color: white;
        border-radius: 5px;
        padding: 25px;
        margin: 10px;
        border-radius: 5px;
        background-color: #212121;
        text-align: center;
        cursor: pointer;
    }

    #cell:hover {
        background-color: #2f2f2f;
    }

    /* global.css */
    /* Estilos para WebKit */
    ::-webkit-scrollbar {
        width: 12px;
    }

    ::-webkit-scrollbar-track {
        background: #424242;
    }

    ::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 0px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: #555;
    }

    /* Estilos para Firefox */
    html {
        scrollbar-width: thin;
        scrollbar-color: #888 #f1f1f1;
    }
</style>
