<script>
    import { createEventDispatcher } from "svelte";
    import TableViewBase from "../components/tableview/TableViewBase.svelte";
    import { collectionByName, getCookieInfo } from "../API";
    import { gptsList,pageInfo } from "../stores/auth";

 

    const dispatch = createEventDispatcher();

    // init();
    async function init() {
        
        // let response = await collectionByName("gpts/"+getCookieInfo("uid")+"/userGPTS");
        
        let response = await collectionByName("gpts/"+$pageInfo.document.pageid+"/userGPTS");
        //  gptsList.update(gpt => [...gpt,response])
        
       
    }
    // console.log($pageInfo.document.pageid)
     $:pageInfo,init()
    //  console.log($pageInfo.document.pagename);

    function eventHandler(event) {
        dispatch("componentEvent", event.detail);
        // console.log(event)
    }
</script>

<div class="userpage-container">
    <div class="userpage-content">
        <div class="top-content"></div>
        <div class="center-content">
            <TableViewBase on:componentEvent={eventHandler} />
        </div>
        <div class="bottom-content"></div>
    </div>
</div>

<style>
    * {
        font-family: Helvetica, sans-serif;
        /* font-size: 15px; */
        margin: 0;
        padding: 0;
    }

    .userpage-content {
        display: grid;
        grid-template-rows: 0.07fr auto 0.07fr;
        height: 100vh;
        overflow-y: auto;
    }

    .top-content {
        position: sticky;
        top: 0;
        background-color: #212121;
        height: 50px;
    }

    /* header{
        text-align: center;
        background-color: aqua;
        height: 500px;
    } */

    .center-content {
        /* background-color: royalblue; */
        width: 60%;
        margin: 0 auto;
    }

    .bottom-content {
        position: sticky;
        bottom: 0;
        /* background-color: red; */
        height: 50px;
    }
</style>
