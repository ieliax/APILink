<script>
    import TableViewCell from "./tableviewcell/TableViewCell.svelte";
    import { pageInfo,gptsList } from "../../stores/auth";
    import { createEventDispatcher } from "svelte";
        // import { gptsList } from "../stores/auth";


    const dispatch = createEventDispatcher();

    let list = [0,1,2];

    // console.log($pageInfo)
    function eventHandler(event){
        dispatch("componentEvent",event.detail);
        //  console.log(event.detail)
    }

</script>
<div class="tableview-container">
    <div class="tableview-content">
        <div class="top-content">
            <header>
                <h1>{$pageInfo.document.pagename}</h1>
                <p>{$pageInfo.document.pagelink}</p>
                <p>{$pageInfo.document.pagedescription}</p>
            </header>
            <TableViewCell
             cellname="Create a GPT"
             cellDetails="Customise a version of ChatGPT for a specific pursose"
             tag={null}
             editionMode={true}
             on:componentEvent={eventHandler}/>
        </div>

        <div class="center-content">

            {#each $gptsList as lista,index}
            <TableViewCell
            cellname="Create a GPT"
            cellDetails="Customise a version of ChatGPT for a specific pursose"
            editionMode={true}
            tag={index}
            on:componentEvent={eventHandler}/>
            {/each}

             


        </div>
        <div class="bottom-content">c</div>
    </div>
</div>

<style>
    .tableview-content {
        display: grid;
        grid-template-rows: 0.1fr auto 0.1fr;
        /* background-color: red; */
    }

    .center-content{
        display: flex;
        flex-direction: column;
    }

    .top-content{
        border-bottom: 1px solid #424242;

        /* background-color: red; */
    }

    header {
        text-align: center;
        color: white;
        /* background-color: aqua; */
        /* height: 150px; */
    }
</style>
