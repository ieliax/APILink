<script>
    import { onMount } from 'svelte';
    let chatboxMain;
    let textarea;
    let messages = []; // Esto almacenará los mensajes del chat

    // Función para agregar mensajes al chat
    function sendMessage() {
        const message = textarea.value.trim();
        if (message) {
            messages = [...messages, { text: message, role: 'user' }];
            textarea.value = ''; // Limpia el textarea después de enviar
            // Simulando respuesta del servidor
            setTimeout(() => {
                messages = [...messages, { text: "¡Respuesta automática!", role: 'assistant' }];
            }, 1000);
        }
    }

    // Ajusta la altura del textarea basado en su contenido
    function autoResize() {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight +10 + 'px';
    }
    function handleKeydown(){

    }

    onMount(() => {
        function setVH() {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }

        setVH();
        // Ejecuta la función al cargar la página
        window.addEventListener('resize', setVH);

        // Asegúrate de actualizar la altura cuando se cambie el tamaño de la ventana
        window.addEventListener('resize', setVH);
    });
</script>

<div class="chatbox" bind:this={chatboxMain}>
    <div class="chatbox__content">
        <div class="messages">
            {#each messages as message}
                <div class={`message ${message.role}`}>
                    {message.text}
                </div>
            {/each}
        </div>
        <div class="input-area">
            <textarea bind:this={textarea} class="textarea" on:input={autoResize}></textarea>
            <button on:click={sendMessage}>Send</button>
        </div>
    </div> 
</div>

<style>

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.chatbox {
    /* display: flex; */
    /* flex-direction: column; */
    /* max-width: 600px; */
    /* height: calc(var(--vh, 1vh) * 100); */
    background-color: black;
    /* height: calc(100vh - 20px); */
    /* margin: 0 auto; */
    margin: -8px;

}

.chatbox__content{
    display: flex;
    flex-direction: column;
    max-width: 600px;
    height: calc(var(--vh, 1vh) * 100); /* Usa 100 veces el valor de --vh */
    /* height: calc(100vh - 20px); */
    margin: 0 auto;
    /* margin: -8px; */

    border: 1px solid #ae2626;
    background-color: red;
    padding: 10px;
}

.messages {
    flex-grow: 1;
    overflow-y: auto;
}
.message {
    margin: 5px;
    padding: 10px;
    background-color: #f4f4f4;
    border-radius: 8px;
}
.user {
    align-self: flex-end;
    background-color: #dcf8c6;
}
.assistant {
    align-self: flex-start;
    background-color: #f4f4f4;
}
.input-area {
    display: flex;
    flex-shrink: 0;
}
.textarea {
    width: 100%;
    min-height: 50px;
    border: 1px solid #ccc;
    padding: 8px;
    resize: none;
    overflow: hidden;
}
button {
    padding: 10px 20px;
    cursor: pointer;
}

</style>
