<script>
    import TableViewCell from "./tableviewcell/TableViewCell.svelte";
    import { pagename } from "../../stores/auth";

    console.log($pagename)

</script>
<div class="tableview-container">
    <div class="tableview-content">
        <div class="top-content">
            <header>
                <h1>{$pagename.document.pagename}</h1>
                <p>{$pagename.document.pagelink}</p>
                <p>{$pagename.document.pagedescription}</p>
            </header>
            <TableViewCell/>
        </div>
        <div class="center-content">
            <TableViewCell/>
            <TableViewCell/>
            <TableViewCell/>
            <TableViewCell/>
            <TableViewCell/>
            <TableViewCell/>

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
        border-bottom: 1px solid #424242
    }

    header {
        text-align: center;
        color: white;
        /* background-color: aqua; */
        /* height: 500px; */
    }
</style>
