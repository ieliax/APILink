<script>
    import { createEventDispatcher } from "svelte";
   
    const dispatch = createEventDispatcher()

    function action(event) {

        dispatch('onclick',{
            showalert:true,
            id:event.target.id
        });
        
    }
</script>

<div class="div4">
    <button id="edit" on:click={action}>Edit Profile</button>
    
    <div class="div4A">
        <button id="prev" on:click={action}>Preview</button>
        <button id="live" on:click={action}>Go Live</button>
    </div>
</div>

<style>
  
    .div4 {
        display: flex;
        flex-direction: column;
        gap: 5px;
        padding-top: 10px;
        /* background-color: white;  */
        justify-content: center;
        align-items: center;
    }

    .div4 button{
        width: 100%;
        padding-top: 7px;
        padding-bottom: 8px;
        border-radius: 10px;
        border: 1px solid #00000036;
        margin-inline: 20px;
        background: transparent;
        font-family: Roboto;
        font-size: 14px;
        font-weight:500;
        color: #121212;
        cursor: pointer;
    }

    .div4A {
        display: flex;
        flex-direction: row;
        /* background: rebeccapurple; */
        width: 100%;
        gap: 5px;
    }
    .div4A button {
        padding-top: 7px;
        padding-bottom: 8px;
        border-radius: 10px;
        border: 1px solid #00000036;
        margin-inline: 0px;
        background: transparent;
        font-family: Roboto;
        font-size: 14px;
        font-weight: 500;
        color: #121212;
    }
</style>
