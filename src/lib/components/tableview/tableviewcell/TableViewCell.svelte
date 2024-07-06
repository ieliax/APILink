<div class="container">
    <div class="content">
        <div class="infocell">
            <h4>GPT Name</h4>
            <p>description</p>
        </div>
        <div class="editcell">
            <p>edit</p>
        </div>
    </div>
</div>
<style>
* {
    margin: 0;
    padding: 0;
    font-family: Arial, Helvetica, sans-serif;
}

    .container{
        color: white;
        border-radius: 5px;
        padding: 20px;
        margin: 10px;
        border-radius: 5px;
        /* background-color: #383838; */
        /* text-align: center; */
        cursor: pointer;;
    }
    .container:hover{
        background-color: #2F2F2F;
    }

    .content{
        display: grid;
        grid-template-columns: 1fr .1fr;
    }

    .infocell{
        /* background-color: red; */
    }
    .editcell{
        display: flex;
        /* background-color: red;  */
        align-items: center;
        /* font-weight: bold; */
        justify-content: center;
    }
    .editcell:hover{
        background-color: #424242;
        border-radius: 10px;
    }
</style>