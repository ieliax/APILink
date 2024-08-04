<script>
    import { createEventDispatcher } from "svelte";
    export let isOpen = false; // Controla si el modal está abierto o cerrado
    export let close; // Función para cerrar el modal
    const dispatch = createEventDispatcher();

    function onClose(event){
        dispatch("close1")
        console.log("asdasdasd")
    }

    function onClickEdit(event){
        dispatch("close1",{object:"edit"})
     
    }

    function onClickDelete(event){
        dispatch("close1",{object:"delete"})
       
    }

    function onClickCancel(event){
        dispatch("close1",{object:"cancel"})
       
    }

    export function elias(){
        console.log("tamo dentro")
    }

    // init()
    function init(){
        console.log("init")
    }
</script>

{#if isOpen}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="modal-backdrop" on:click={onClose}>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="modal-content"  on:click|stopPropagation>
            <!-- Aquí se insertará cualquier contenido pasado al modal -->
            <!-- Contenido del modal aquí -->

            <!-- Footer -->
            <div class="modal-footer">
                <button>asas</button>
                <button on:click={onClickEdit}>Editar</button>
                <button on:click={onClickDelete}>Eliminar</button>
                <button on:click={onClickCancel}>Cancelar</button>
            </div>
        </div>
    </div>
{/if}

<style>
    .modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.3); /* Fondo semitransparente */
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 999; /* Asegúrate de que el modal esté sobre otros elementos */
    }

    .modal-content {
        position: relative; /* Establece como referencia para el posicionamiento absoluto */
        /* background-color: red; */
        height: 100%;
        width: 100%;
        overflow: auto; /* Asegura que el contenido pueda desplazarse */
    }

    .modal-footer {
        position: absolute;
        display: flex;
        gap: 5px;
        padding-top: 20px;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        flex-direction: column;
        bottom: 0; /* Alinea el pie de página en la parte inferior */
        height: auto; /* Altura del pie de página */
        background-color: #212121; /* Color del pie de página */
        width: 100%; /* Asegura que ocupe el ancho completo del modal */
    }
    .modal-footer button{
        padding: 20px;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        margin-left: 10px;
        color: white;
        margin-right: 10px;
        background-color: transparent;
        outline: none;
        border: none;
        text-align: left;
        font-size: 16px;
    }
</style>
