<script>
    import { createEventDispatcher } from "svelte";
    import { writable } from "svelte/store";
    import { name,description,instruction } from "../../stores/adminStore";

    export let labelname;
    export let inputdescription;
    export let id;
    export let storeValue;

    const dispatch = createEventDispatcher();

    let bindValue = writable("");
    bindValue.subscribe((value) => {
        dispatch("componentEvent", { eventType: id, objectinfo: value });
    });
</script>

<div class="container">
    <label for="name">{labelname}</label>
    <input
        bind:value={$storeValue}
        type="text"
        name="name"
        title="name"
        placeholder={inputdescription}
    />
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        /* background-color: red; */
    }
    .container input {
        width: 95%;
        border: 1px solid #424242;
        padding: 10px;
        outline: none;
        border-radius: 10px;
        background-color: transparent;
    }
</style>
