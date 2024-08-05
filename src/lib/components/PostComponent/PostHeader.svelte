<script>
    import { createEventDispatcher } from "svelte";
    // import { pagename,pagelogo } from "$lib/AppStore";
    import '@fortawesome/fontawesome-free/css/all.min.css'

    
    const dispatch = createEventDispatcher();

    export let icon = "fa-solid fa-ellipsis"
    export let icon2 = "fa-solid fa-trash"
    
    function actionHandler(event){
        // console.log(event.tag)
        dispatch('edit')
    }
</script>

<div class="header_grid">
    <div class="div1">
        <img src="https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/640px-Starbucks_Corporation_Logo_2011.svg.png" alt="pagelogo">
    </div>
    <div class="div2">
        <h5>thecodecrumbs</h5>
        <!-- <button>category</button> -->
    </div>
    <button class="div3" on:click={actionHandler}>
        <i class={icon}></i>
        <!-- <i class={icon2}></i> -->
    </button>
</div>

<style>
    h5{
        margin: 0;
        /* background: red; */
        font-family: Roboto;
        font-size: 14px;
        color: black;
        
    }
    .header_grid{
        display: grid;
        width: 100%;
        grid-template-columns: 1fr 12fr 1fr;
        background-color: white;
        /* background-color: green; */
    }
    .div1{
        display: flex;
        width: 50px;
        height: 50px;
        justify-content: center;
        align-items: center;
        /* background: red; */
    }
    .div2{
        display: flex;
        flex-direction: column;
        height: 50px;
        /* background: orange; */
        justify-content: center;
        gap: 2px;
    }
    .div3{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 50px;
        border: none;
        cursor: pointer;
        background: none;
        /* background: red; */
    }
    .div1 img{
        width: 65%;
        height:65%;
        object-fit: cover;
        border-radius: 50px;
        
    }

    /* .div2 button{
        width: 25%;
        height:45%;
        object-fit: cover;
        border-radius: 50px;
    } */
</style>