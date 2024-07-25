<script>
    import { onMount, tick } from "svelte";
    import GptMessagebox from "../../lib/components/GPTMessagebox.svelte";
    import GptInfo from "../../lib/components/GPTInfo.svelte";
    let chatboxMain;
    let textarea;
    let messages = []; // Esto almacenará los mensajes del chat
    import {
        messagelist,
        openaiList,
        gptanalizer,
    } from "../../lib/stores/auth";
    import GptSalesMessagebox from "../../lib/components/GPTSalesMessagebox.svelte";

    export let data;

    // Función para agregar mensajes al chat
    async function sendMessage() {
        const message = textarea.value.trim();

        if (message) {
            messagelist.update((m) => [
                ...m,
                { role: "user", content: textarea.value },
            ]);
            // messages = [...messages, { text: message, role: "user" }];
            textarea.value = ""; // Limpia el textarea después de enviar
            textarea.style.height = 50 + "px";
            await tick();
            scrollToBottom();

            let analizeResponse = JSON.parse($gptanalizer);

            if (analizeResponse.action === "modelchange") {
                if (analizeResponse.model == "salesGPT") {
                    let response = JSON.parse($openaiList);
                    console.log(response.items);
                    setTimeout(async () => {
                        // messages = [...messages,{text: "¡Respuesta automática!",role: "assistant"}];
                        messagelist.update((m) => [...m,{role: "assistant", text:response.text, model:analizeResponse.model, itemList:response.items}]);
                        await tick(); // Espera a que Svelte actualice el DOM
                        scrollToBottom(); // Llama a la función que ajusta el scroll
                    }, 1000);
                }
            } else {
                //...
            }

            // textarea.style.overflowY = "hidden";
        }
    }

    // Ajusta la altura del textarea basado en su contenido
    function autoResize() {
        //     textarea.style.overflow = 'hidden';
        // if (textarea.scrollHeight > textarea.clientHeight) {
        //     textarea.style.height = 'auto';
        //     textarea.style.height = textarea.scrollHeight + 'px';
        // }

        const scrollHeight = textarea.scrollHeight;
        const clientHeight = textarea.clientHeight;

        // Ajusta la altura solo si el scrollHeight es mayor que clientHeight

        if (scrollHeight > clientHeight) {
            textarea.style.height = scrollHeight + "px"; // Ajusta a la altura del contenido
            if (scrollHeight > 150) {
                console.log("todo limpio");
                textarea.style.overflowY = "auto"; // Activa la barra de desplazamiento
                // scrollToBottom()
            } else {
                scrollToBottom();
            }
        } else if (!textarea.value.trim()) {
            console.log("todo limpio22");
            // textarea.style.height = 'auto'
            textarea.style.height = 50 + "px";
            textarea.style.overflowY = "hidden";
        }
    }

    onMount(() => {
        function setVH() {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty("--vh", `${vh}px`);
        }

        setVH();
        // Ejecuta la función al cargar la página
        window.addEventListener("resize", setVH);

        // Asegúrate de actualizar la altura cuando se cambie el tamaño de la ventana
        window.addEventListener("resize", setVH);
    });

    function scrollToBottom() {
        chatboxMain.scrollTop = chatboxMain.scrollHeight; // Ajusta el scroll al fondo
        console.log(chatboxMain.scrollTop);
    }

    function handleKeydown(event) {
        // console.log("assss")
        if (event.key === "Enter") {
            if (!event.shiftKey) {
                event.preventDefault(); // Previene la inserción de un salto de línea
                sendMessage();
            } else {
                // Aquí, simplemente permites que el salto de línea ocurra, no necesitas hacer nada especial.
                if (textarea.value.trim() === "") {
                    event.preventDefault(); // Si no hay texto, también previene el salto de línea con Shift+Enter
                    console.log("no hay texto");
                } else {
                    // updateScroll();
                    console.log("Asssss");
                }
            }
        }
    }
</script>

<div class="chatbox">
    <div class="chatbox__content">
        <div class="messages" bind:this={chatboxMain}>
            {#if $messagelist.length == 0}
                <GptInfo
                    gptname={data.pageinfo.nickname}
                    gptlink={"By " + data.pageinfo.biolink}
                    gptdescription={data.pageinfo.bio}
                />
            {:else}
                {#each $messagelist as message}
                    {#if message.role == "assistant"}
                        {#if message.model == "salesGPT"}
                            <GptSalesMessagebox role={message.role} message={message.text} crossell={message.itemList} />    
                        {/if}
                        
                    {:else if message.role == "user"}
                        <!-- {l.content} -->
                        <GptMessagebox role={message.role} message={message.content} />
                    {/if}
                {/each}
            {/if}
            {#each messages as message}
                <!-- <div class={`message ${message.role}`}>
                    {message.text}
                </div> -->
                <!-- <GptMessagebox role={message.role} message={message.text} /> -->
            {/each}
        </div>
        <div class="input-area">
            <textarea
                bind:this={textarea}
                class="textarea"
                on:input={autoResize}
                on:keydown={handleKeydown}
                placeholder="Message ChatGPT"
            ></textarea>
            <button on:click={sendMessage}>Send</button>
        </div>
        <!-- <div class="input-grid">
            <textarea bind:this={textarea} class="textarea" on:input={autoResize}  on:keydown={handleKeydown}></textarea>
            <button on:click={sendMessage}>Send</button>
        </div> -->
    </div>
</div>

<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    .chatbox {
        background-color: #212121;
        margin: -8px;
    }

    .chatbox__content {
        display: flex;
        flex-direction: column;
        max-width: 800px;
        height: calc(var(--vh, 1vh) * 100); /* Usa 100 veces el valor de --vh */
        /* height: calc(100vh - 20px); */
        margin: 0 auto;
        /* margin: -8px; */

        /* border: 1px solid #ae2626; */
        /* background-color: red; */
        padding: 10px;
    }

    .messages {
        flex-grow: 1;
        overflow-y: auto;
        /* padding: 10px; */
        /* background-color: red; */
    }
    .message {
        margin: 5px;
        padding: 10px;
        background-color: #f4f4f4;
        border-radius: 8px;
        overflow-wrap: break-word;
        word-wrap: break-word;
        word-break: break-word;
        max-width: 100%;
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
        align-items: center;
        /* height: 50px; */
        /* flex-direction: row; */
        border-radius: 50px;
        flex-shrink: 0;
        background-color: #2f2f2f;
        padding: 5px;
        margin-top: 10px;
    }

    .textarea {
        flex: 1;
        font-family:
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            "Open Sans",
            "Helvetica Neue",
            sans-serif;
        /* width: 100%; */
        font-size: 15px;
        border: none;
        height: 55px;
        min-height: 55px; /* Ajusta según el tamaño de la fuente y el padding */
        max-height: 155px;
        padding: 14px; /* Asegúrate de ajustar esto para centrar el texto verticalmente */
        padding-left: 35px;
        outline: none;
        background-color: transparent;
        border: none;
        color: #ececec;

        /* max-height: 150px;
    min-height: 50px; */
        /* border: 1px solid #ccc; */
        /* padding-top: 10px;
    line-height: 15px; */
        resize: none;
        box-sizing: border-box;
        /* overflow: hidden; */
        overflow-y: hidden;
        line-height: 25px;
    }
    button {
        padding: 10px 20px;
        /* max-height: 50px; */
        cursor: pointer;
        align-self: flex-end;
    }
</style>
