<script>
    // import { onMount } from "svelte";
    import { messagelist } from "../../../lib/stores/auth";
    import { onMount, tick } from "svelte";
    import { linear } from "svelte/easing";
    import GptInfo from "../../../lib/components/GPTInfo.svelte";

    let chatboxMain;
    let footerheight = 65; // Inicia con la altura del footer predeterminada
    let myTextarea;
    let paddinbottom = 10;
    let previousScrollHeight = 45; // Inicializa con la altura inicial del textarea
    let newline = false;
    let currentHeight = 43;
    let lastHeight = 0;
    
    export let data;

     console.log(data)

    onMount(() => {
        chatboxMain.style.height = `calc(100vh - ${footerheight}px)`;
    });

    async function sendMessage() {
        if (myTextarea.value.trim() !== "") {
            console.log("Mensaje enviado:", myTextarea.value);
            messagelist.update((m) => [...m, { message: myTextarea.value }]);
            myTextarea.value = ""; // Limpia el textarea después de enviar
            await tick(); // Espera a que Svelte complete las actualizaciones del DOM
            scrollToBottom(); // Asegura que el scroll baje al último mensaje
        }
    }

    function scrollToBottom() {
        chatboxMain.scrollTop = chatboxMain.scrollHeight; // Desplaza el scroll al final del contenedor
    }

    function handleInput(event) {
        adjustFooterHeightIfNeeded();
        console.log(myTextarea.scrollHeight);
    }

    function adjustFooterHeightIfNeeded() {
        const currentScrollHeight = myTextarea.scrollHeight;
        // console.log(currentScrollHeight)

        if (myTextarea.value.trim() !== "" && !newline) {
            console.log("tiene algo");
            lastHeight = currentHeight;
            currentHeight = currentScrollHeight;
            footerheight = Math.max(
                65,
                myTextarea.scrollHeight + paddinbottom * 2,
            );
            newline = !newline;
        } else if (!myTextarea.value.trim()) {
            // Si no hay texto, restablece la altura del footer a la mínima
            footerheight = 65;
            previousScrollHeight = 45; // Restablecer la altura anterior para evitar desajustes
            lastHeight = 0;
            currentHeight = 43;
            newline = !newline;
        } else if (
            currentScrollHeight > currentHeight &&
            myTextarea.scrollHeight < 163
        ) {
            lastHeight = currentHeight;
            currentHeight = currentScrollHeight;
            console.log("subiendo", currentHeight);
            footerheight = Math.max(65, currentScrollHeight + paddinbottom * 2);
        } else if (currentScrollHeight < currentHeight && lastHeight) {
            // console.log("current",currentHeight,"scroll:",currentScrollHeight)
            lastHeight = currentHeight;
            currentHeight = currentScrollHeight;
            footerheight = Math.max(65, lastHeight);
        }
    }

    function updateScroll() {
        requestAnimationFrame(() => {
            myTextarea.scrollTop = myTextarea.scrollHeight;
        });
    }
    function handleKeydown(event) {
        if (event.key === "Enter") {
            if (!event.shiftKey) {
                event.preventDefault(); // Previene la inserción de un salto de línea
                sendMessage();
            } else {
                // Aquí, simplemente permites que el salto de línea ocurra, no necesitas hacer nada especial.
                if (myTextarea.value.trim() === "") {
                    event.preventDefault(); // Si no hay texto, también previene el salto de línea con Shift+Enter
                    console.log("no hay texto");
                } else {
                    updateScroll();
                }
            }
        }
    }
</script>

<div class="chatbox">
    <div
        class="chatbox__main"
        bind:this={chatboxMain}
        style="height: calc(100vh - {footerheight}px);"
    >
        <div class="chatbox__header"></div>
        <div class="chatbox__content">
            {#if $messagelist.length == 0}
                <!-- <button>vacio</button>  -->
                <GptInfo
                    gptname={data.pageinfo.nickname}
                    gptlink={"By "+data.pageinfo.linkbio}
                    gptdescription={data.pageinfo.bio}
                />
            {:else}
                {#each $messagelist as l}
                    <button>{l.message}</button>
                {/each}
            {/if}
        </div>
    </div>
    <div class="chatbox__footer" style="height: {footerheight}px;">
        <div class="chatbox__footer-content">
            <textarea
                bind:this={myTextarea}
                on:input={handleInput}
                on:keydown={handleKeydown}
                class="chatbox__footer-textarea"
                style="padding-bottom: {paddinbottom}px;"
            ></textarea>
            <p>ChatGPT can make mistakes. Check important info.</p>
        </div>
    </div>
</div>

<style>
    * {
        margin: 0;
        padding: 0;
    }
    .chatbox {
        margin: -8px;
    }

    .chatbox__header {
        position: sticky;
        top: 0;
        background-color: blueviolet;
        height: 65px;
        /* height: clamp(65px, 100%, 65px); */
    }

    .chatbox__main {
        display: grid;
        grid-template-rows: 0.1fr auto;
        background-color: red;
        /* height: 90vh; */

        overflow-y: auto;
        /* z-index: -1000; */
        /* width: 100%; */
    }
    .chatbox__content {
        display: flex;
        flex-direction: column;
        /* height: 100%; */
        /* width: 50%; */
        width: clamp(450px, 100%, 685px);

        margin: 0 auto;
        /* width: 100%;
        height: 100%; */

        background-color: blue;
    }

    button {
        /* width: 100%; */
        margin: 10px;
        height: 600px;
    }
    .chatbox__footer {
        display: flex;
        position: sticky;
        bottom: 0;
        width: 99%;
        justify-content: center;
        /* height: 165px; */
        background-color: brown;
    }

    .chatbox__footer-content {
        display: grid;
        grid-template-rows: auto 0.1fr;
        width: clamp(450px, 100%, 785px);
        /* margin-left: -16px; */
        background-color: blue;
        /* margin: 0 auto; */
        /* align-items: center; */
    }

    .chatbox__footer-content p {
        background-color: red;
        text-align: center;
        height: 20px;
    }

    .chatbox__footer-textarea {
        width: clamp(450px, 90%, 785px);
        padding: 10px;
        margin: 0 auto;
        /* margin-bottom: 10px; */
        bottom: 0;
        /* max-height: 150px; */
        /* height: 60px; */
        resize: none;
        line-height: 22px;
    }
</style>
