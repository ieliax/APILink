<script>
    import { createEventDispatcher } from "svelte";

    
    const dispatch = createEventDispatcher();

    export let cellname;
    export let cellDetails;
    export let editionMode;
    export let tag;

    function handleClick(event){
        //   console.log(event.currentTarget.id)
         dispatch("componentEvent",{EventType:event.currentTarget.id,tag:tag})
    }

</script>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
             <!-- svelte-ignore a11y-no-static-element-interactions -->
<div id="container">

    <div id="content">
        <!-- svelte-ignore a11y-click-events-have-key-events -->

        <div id="infocell"  on:click={(event) => handleClick(event)}>
            <h3>{cellname}</h3>
            <p>{cellDetails}</p>
        </div>
        {#if editionMode}
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div id="editcell" on:click={(event) => handleClick(event)} >
                <p>edit</p>
            </div>
        {/if}
    </div>
</div>

<style>
    * {
        margin: 0;
        padding: 0;
        font-family: Arial, Helvetica, sans-serif;
        /* font-size: 15px; */
    }

    #container {
        color: white;
        border-radius: 5px;
        /* padding: 20px; */
        margin: 10px;
        border-radius: 5px;
        /* background-color: #383838; */
        /* text-align: center; */
        cursor: pointer;
    }
    .container:hover {
        background-color: #2f2f2f;
    }

    #content {
        display: grid;
        grid-template-columns: 1fr 0.1fr;
    }

    #infocell {
        display: flex;
        flex-direction: column;
        gap: 3px;
        padding: 20px;
        /* background-color: red; */
    }

    #infocell h3 {
        font-size: 16px;
    }

    #infocell p {
        font-size: 14px;
    }

    #editcell {
        display: flex;
        /* background-color: red;  */
        align-items: center;
        /* font-weight: bold; */
        justify-content: center;
    }
    #editcell:hover {
        background-color: #424242;
        border-radius: 10px;
    }
</style>
