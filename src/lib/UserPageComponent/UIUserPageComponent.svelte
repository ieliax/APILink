<script>
    import TableViewBase from "../components/tableview/TableViewBase.svelte";


</script>
<div class="userpage-container">
    <div class="userpage-content">
        <div class="top-content"></div>
        <div class="center-content">
            <TableViewBase/>
        </div>
        <div class="bottom-content">
            
        </div>
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
