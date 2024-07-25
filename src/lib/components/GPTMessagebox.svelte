<script>
    import {onMount, onDestroy } from "svelte";

    export let message = `Explicación del Código
Enter sin Shift: El evento Enter sin presionar Shift siempre previene la inserción de un salto de línea por defecto. Además, verifica si hay texto antes de procesar el envío del mensaje.

Shift+Enter para Saltos de Línea: La combinación Shift+Enter para introducir un salto de línea solo se permite si ya existe texto en el <textarea>. Si el <textarea> está vacío, se previene la acción para evitar saltos de línea vacíos.

Trimming del Texto: Utilizar trim() en myTextarea.value.trim() asegura que los espacios en blanco al inicio y al final no cuenten como contenido válido para la inserción de saltos de línea o para enviar mensajes.

Este enfoque mantiene la interfaz limpia y funcional, al tiempo que garantiza que los usuarios no puedan enviar mensajes vacíos o introducir saltos de línea inútiles, lo que puede ayudar a mantener la claridad y estructura del chat. Además, la prevención de saltos de línea cuando no hay texto ayuda a reducir la posibilidad de que los usuarios envíen accidentalmente contenido no deseado o malformado.
     `;
    const imageurl =
        "https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/640px-Starbucks_Corporation_Logo_2011.svg.png";

    let myTextarea;

    export let role;
    // Mytextarea.scrollTop = Mytextarea.scrollHeight;
    onMount(() => {
        // window.addEventListener('resize', adjustTextareaHeight);
        adjustTextareaHeight();
    });

    function adjustTextareaHeight() {
        // Establecer altura automáticamente basada en el contenido
        if (myTextarea) {
            myTextarea.style.height = "auto";
            myTextarea.style.height = `${myTextarea.scrollHeight-0}px`;
        // console.log(window)
        }
    }

    onDestroy(() => {
        // window.removeEventListener('resize', adjustTextareaHeight); // Limpiar el listener al destruir el componente
    });
    
</script>

<div class="messagebox">
    <div class="messagebox__container">
        {#if role == "assistant"}
        <img src={imageurl} alt="" />
        <div class="messagebox__container-message" >
            <textarea name="" bind:this={myTextarea}>{message}</textarea>
        </div>
        {:else if role == "user"}
        <img src={imageurl} alt="" />
        <div class="messagebox__container-message" >
            <textarea name="" bind:this={myTextarea} >{message}</textarea>
        </div>
        
        {/if}

    </div>
</div>

<style>
    .messagebox__container {
        display: flex;
        flex-direction: row;
        /* background-color: aqua; */
        gap: 10px;
        /* height: auto; */
        margin-bottom: 20px;
        margin: 10px;
    }

    .messagebox__container img {
        width: 30px;    
        height: 30px;   
        object-fit: cover;
        
    }

    .messagebox__container-message {
        /* line-height: 22px; */
        display: flex;
        /* background-color: rosybrown; */
        width: 100%;
    }
    .messagebox__container-message textarea {
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size: 16px;
        width: 100%;
        resize: none;
        overflow-y: hidden;
        outline: none;
        border: none;
        color: #E3E3E3;
        background-color: transparent;
        /* align-content: center; */
        margin-top: 0px;
        line-height: 25px;
        /* line-height: 25px; */
        /* padding: 5px; */
        /* box-sizing: border-box; */
        /* padding: 10px; */
        
    }
</style>
