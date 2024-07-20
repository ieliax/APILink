<script>
    import { createEventDispatcher } from "svelte";
    import { gptsList } from "../../stores/auth";
    import { writable } from "svelte/store";

    export let labelname;
    export let inputdescription;
    export let id;
    export let storeValue;

    const dispatch = createEventDispatcher();

    let textareaValue = writable("");
    textareaValue.subscribe((value) => {
        dispatch("componentEvent", { eventType: id, objectinfo: value });
    });
    // gptsList.update(gpt =>{
    //     return {...gpt,description:value}
    // })
</script>

<div class="container">
    <label for="name">{labelname}</label>
    <div class="content">
        <textarea
            bind:value={$storeValue}
            name="name"
            placeholder={inputdescription}
        />
        <button>expand</button>
    </div>
    <p>{textareaValue}</p>
</div>

<style>
    * {
        font-family: Arial, Helvetica, sans-serif;
    }

    .content {
        position: relative;
        width: 98%;
        height: 120px;
        border-radius: 10px;
        border: 1px solid #424242;
        padding: 3px;
    }
    .container button {
        position: absolute;
        bottom: 5px;
        right: 5px;
    }
    .container textarea {
        width: 99%;
        height: 114px;
        background-color: transparent;
        resize: none;
        border: none;
        outline: none;
        margin-top: 5px;
        margin-left: 5px;
        /* margin: 10px; */
    }
    /* .container input{
        width: 95%;
        border: 1px solid #424242;
        padding: 10px;
        outline: none;
        border-radius: 10px;
        background-color: transparent;
    } */
</style>
