<script>
    import { createEventDispatcher } from "svelte";

    let name = "";
    let email = "";
    let password = "";

    const dispatch = createEventDispatcher();

    function eventHandler(event) {
        if (event.target.id == "close_btn") {
            dispatch("componentEvent", {
                eventType: event.target.id,
                objectInfo: {},
            });
        } else if (event.target.id == "register_btn") {
            dispatch("componentEvent", {
                eventType: event.target.id,
                objectInfo: { name: name, email: email, password: password },
            });
        }
    }
</script>

<div class="dialog-container">
    <div class="dialog-content">
        <div class="dialog-header">
            <h2>Registrarte</h2>
            <button id="close_btn" on:click={eventHandler}>X</button>
        </div>

        <div class="dialog-body">
            <label for="name">Name</label>
            <input
                type="text"
                name="name"
                bind:value={name}
                placeholder="Ingresa nombre del negocio"
            />
            <label for="email">Email</label>
            <input
                type="text"
                name="email"
                bind:value={email}
                placeholder="Ingresa una contracena de 6 characteres"
            />
            <label for="password">Password</label>
            <input
                type="text"
                name="password"
                bind:value={password}
                placeholder="Ingresa una contracena de 6 characteres"
            />
        </div>

        <div class="dialog-footer">
            <button id="register_btn" on:click={eventHandler}>Registrar</button>
        </div>
    </div>
</div>

<style>
    * {
        font-family: Helvetica, sans-serif;
        font-size: 15px;
        margin: 0;
        padding: 0;
    }

    .dialog-container {
        background-color: #2f2f2f;
        border-radius: 10px;
        margin: 0 auto;
        /* overflow-y: auto; */
    }

    .dialog-content {
        display: grid;
        grid-template-rows: 0.1fr auto 0.1fr;
        width: 400px;
        /* height: 650px; */
        /* background-color: white; */
        margin: 20px;
        overflow-y: auto;
        gap: 20px;
    }

    .dialog-header {
        display: grid;
        grid-template-columns: 1fr 0.1fr;
        position: sticky;
        top: 0;
        height: 50px;
        color: #f3f3f3;
        /* background-color: rgb(116, 18, 18); */
        /* text-align: center; */
        line-height: 50px;
    }
    .dialog-header h2 {
        font-size: 25px;
    }
    .dialog-header button {
        background-color: #424242;
        border: none;
        color: white;
        width: 50px;
        border-radius: 100px;
        cursor: pointer;
    }

    .dialog-body {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .dialog-body input {
        padding: 12px;
        background-color: transparent;
        border: 1px solid #424242;
        border-radius: 10px;
        outline: none;
        color: white;
    }

    .dialog-body label {
        color: white;
        font-weight: 600;
    }

    .dialog-footer {
        /* display: flex; */
        position: sticky;
        bottom: 0;
        height: 60px;
        /* background-color: rgb(116, 18, 18); */
    }
    .dialog-footer button {
        width: 100%;
        height: 100%;
        border-radius: 10px;
        border: none;
        cursor: pointer;
    }
</style>
