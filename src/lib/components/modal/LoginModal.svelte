<script>
    import { createEventDispatcher } from "svelte";
    import ModalBase from "./ModalBase.svelte";

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
            
        } else if (event.target.id == "login_btn") {
            dispatch("componentEvent", {
                eventType: event.target.id,
                objectInfo: { name: name, email: email, password: password },
            });
        }
        else if (event.target.id == "signup_btn") {
            dispatch("componentEvent",{
                eventType: event.target.id,
                objectInfo: {},
            });
        }
        
    }


</script>

<ModalBase >
    <div class="modal-header">
        <h2>Login</h2>
        <button id="close_btn" on:click={eventHandler}>X</button>
    </div>

    <div class="modal-body">
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

    <div class="modal-footer">
        <button id="login_btn" on:click={eventHandler}>Log in</button>
        <button id="signup_btn" on:click={eventHandler}>Have an account? Sign up</button>
    </div>
</ModalBase>

<style>
    * {
        font-family: Helvetica, sans-serif;
        font-size: 15px;
        margin: 0;
        padding: 0;
    }

    .modal-header {
        display: grid;
        grid-template-columns: 1fr 0.1fr;
        /* position: sticky; */
        /* top: 0; */
        height: 50px;
        color: #f3f3f3;
        /* background-color: rgb(116, 18, 18); */
        /* text-align: center; */
        line-height: 50px;
    }
    .modal-header h2 {
        font-size: 25px;
    }
    .modal-header button {
        background-color: #424242;
        border: none;
        color: white;
        width: 50px;
        border-radius: 100px;
        cursor: pointer;
    }

    .modal-body {
        display: flex;
        flex-direction: column;
        gap: 10px;
        /* background-color: red; */
    }

    .modal-body input {
        padding: 12px;
        background-color: transparent;
        border: 1px solid #424242;
        border-radius: 10px;
        outline: none;
        color: white;
    }

    .modal-body label {
        color: white;
        font-weight: 600;
        margin: 0;
        /* background-color: red; */
    }

    .modal-footer {
        display: flex;
        /* position: sticky; */
        flex-direction: column;
        /* bottom: 0; */
        height: 100px;
        /* background-color: rgb(116, 18, 18); */
    }
    .modal-footer button {
        width: 100%;
        height: 100%;
        border-radius: 10px;
        border: none;
        cursor: pointer;
    }
    .modal-footer button[id="signup_btn"] {
        background-color: transparent;
        color: royalblue;
        font-weight: bold;
        border: none;
        outline: none;
    }
</style>
