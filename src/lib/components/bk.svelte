<script>
    // import { onMount } from "svelte";
    import { messagelist } from "../../lib/stores/auth";
    import { onMount, tick } from "svelte";
    import { linear } from "svelte/easing";
    import GptInfo from "../../lib/components/GPTInfo.svelte";
    import GptMessagebox from "../../lib/components/GPTMessagebox.svelte";
    import {
        analizerUserInputGPT,
        customerServiceGPT,
        salesGPT,
        generalSupportGPT
    } from "../../lib/openai";

    let chatboxMain;
    let footerheight = 75; // Inicia con la altura del footer predeterminada
    let myTextarea;
    let paddinbottom = 10;
    let previousScrollHeight = 45; // Inicializa con la altura inicial del textarea
    let newline = false;
    let currentHeight = 43;
    let lastHeight = 0;
    let conversationHistory = "";

    export let data;

    console.log(data);

    onMount(() => {
        let baseHeight;
        
        if(window.innerWidth >= 768){
            // baseHeight = 100;
        }
        //else if(window.innerWidth >=389 && window.innerWidth <=394 ){
        //     baseHeight = 130;
        // }else if(window.innerWidth >=374 && window.innerWidth <=415 ){
        //     baseHeight = 130;
        // }
        console.log(window.innerHeight)
        // 100vh en ambos, ajustar si necesario
        chatboxMain.style.height = `calc(${baseHeight}vh - ${footerheight}px)`;
    });

    function isJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    async function handleResponse(response) {
        // if (isJsonString(response)) {
        // Si la respuesta es JSON válida
        // const jsonResponse = JSON.parse(response);
        const jsonReformat = correctAndParseJsonGpt4(response);
        let responseGPT;
        // console.log(jsonReformat.action)
        // Verificar la estructura del JSON
        if (jsonReformat.action === "modelchange") {
            // Procesar el cambio de modelo
            if (jsonReformat.model == "customerServiceGPT") {
                console.log("Cambio de modelo detectado:", jsonReformat);
                responseGPT = await customerServiceGPT(conversationHistory);
                conversationHistory += `assistant: ${responseGPT}\n`;
                console.log(conversationHistory);
            } else if (jsonReformat.model == "salesGPT") {
                console.log("Cambio de modelo detectado:", jsonReformat);
                responseGPT = await salesGPT(conversationHistory);
                conversationHistory += `assistant: ${responseGPT.userinput}\n`;
                console.log(conversationHistory);
            }
            //  messagelist.update((m) => [...m,{ role: "assistant", content: responseGPT }]);

            console.log(responseGPT);
            //  myTextarea.value = "";

            // messagelist.update((m) => [...m,{ role: "assistant", content: response }]);
            // Aquí puedes implementar la lógica para cambiar al modelo de ventas
        } else {
            // Manejar otros tipos de respuestas JSON
            console.log("Respuesta JSON recibida:", jsonReformat.model);
        }
        // } else {
        //     // Si la respuesta no es JSON, manejarla como texto plano
        //     console.log("Respuesta de texto plano recibida:", response);
        // }
    }

    const responseFromModel = `{
  "assistant": {
    "text": "¿Qué planes tienen disponibles?",
    "action": "modelchange",
    "model": "sellmodelgpt"
  }
}`;

    function correctAndParseJsonGpt4o(jsonString) {
        // Encuentra el primer '{' para asegurar el inicio del objeto JSON
        let startIndex = jsonString.indexOf("{");
        let endIndex = jsonString.lastIndexOf("}") + 1;
        let correctedJsonString = jsonString.slice(startIndex, endIndex);

        // Reemplaza comillas simples con dobles y elimina espacios extraños
        correctedJsonString = correctedJsonString
            .replace(/'/g, '"')
            .replace(/\s+/g, " ");

        // Intenta arreglar comas extras al final de objetos o arrays antes de cerrarlos
        correctedJsonString = correctedJsonString.replace(/,\s*([}\]])/g, "$1");

        try {
            // Intenta parsear el JSON corregido
            return JSON.parse(correctedJsonString);
        } catch (e) {
            console.error("Error parsing JSON:", e);
            return null; // O maneja el error de la manera que prefieras
        }
    }

    function correctAndParseJsonGpt4(jsonString) {
        // let correctedJsonString = jsonString.replace("assistant:", "").trim();
        return JSON.parse(jsonString);
    }

    // handleResponse(responseFromModel);

   

    async function sendMessage() {
        if (myTextarea.value.trim() !== "") {

            console.log("Mensaje enviado:", myTextarea.value);
            messagelist.update((m) => [...m,{ role: "user", content: myTextarea.value }]);
            const tempt =  myTextarea.value;
            myTextarea.value = "";
            await tick(); // Espera a que Svelte complete las actualizaciones del DOM
            adjustFooterHeightIfNeeded();
            scrollToBottom(); // Asegura que el scroll baje al último mensaje
            conversationHistory += `user: ${tempt}\n`;
            
            let analizeGptResponse = await analize(`user: ${conversationHistory}\n`)
            
           
// console.log(analizeGptResponse)
            
            if (analizeGptResponse.action === "modelchange") {
                // Procesar el cambio de modelo
                if (analizeGptResponse.model == "customerServiceGPT") {
                    console.log("Cambio de modelo detectado:", conversationHistory);
                    // return jsonReformat.userinput;
                    let response = await customerServiceGPT(conversationHistory);
                    messagelist.update((m) => [...m,{ role: "assistant", content: response }]);
                    conversationHistory += `assistant: ${response}\n`;

                    await tick(); // Espera a que Svelte complete las actualizaciones del DOM
                    adjustFooterHeightIfNeeded();
                    scrollToBottom(); // Asegura que el scroll baje al último mensaje
                    console.log(conversationHistory)
                    console.log(analizeGptResponse)
                     
                     
                    //  console.log(conversationHistory);
                } else if (analizeGptResponse.model == "salesGPT") {
                    console.log("Cambio de modelo detectado:", analizeGptResponse);
                    // return jsonReformat.userinput;

                    let response = await salesGPT(conversationHistory);
                    let jsonReformat = correctAndParseJsonGpt4(response)
                    messagelist.update((m) => [...m,{ role: "assistant", content: jsonReformat.text }]);
                    conversationHistory += `assistant: ${jsonReformat.text}\n`;

                    await tick(); // Espera a que Svelte complete las actualizaciones del DOM
                    adjustFooterHeightIfNeeded();
                    scrollToBottom(); // Asegura que el scroll baje al último mensaje
                    console.log(conversationHistory)
                    console.log(analizeGptResponse)
                    // responseGPT = await salesGPT(conversationHistory);
                    // messagelist.update((m) => [...m,{ role: "assistant", content: jsonReformat.userinput }]);
                    // conversationHistory += `assistant: ${jsonReformat.userinput}\n`;
                    // console.log(conversationHistory);
                }else{
                    // console.log(analizeGptResponse)
                    console.log("Cambio de modelo por defecto:", analizeGptResponse);
                    let response = await generalSupportGPT(conversationHistory);
                    messagelist.update((m) => [...m,{ role: "assistant", content: response }]);
                    conversationHistory += `assistant: ${response}\n`;
                    await tick(); // Espera a que Svelte complete las actualizaciones del DOM
                    adjustFooterHeightIfNeeded();
                    scrollToBottom(); // Asegura que el scroll baje al último mensaje
                    console.log(conversationHistory)
                    console.log(response)
                    
                }

            } else {
                // Manejar otros tipos de respuestas JSON
                // console.log("Respuesta JSON recibida:", jsonReformat.userinput);
            }

            // console.log(analizeGptResponse)
            myTextarea.value = "";


        }


    }

    async function analize(textToAnalize){
        try {
            let response = await analizerUserInputGPT(textToAnalize);
            
            // messagelist.update((m) => [...m,{ role: "assistant", content: response }]);
             //handleResponse(response);
// console.log(response)
            let jsonReformat = correctAndParseJsonGpt4(response);
            // console.log(jsonReformat)
            return jsonReformat;
            
        } catch (error) {
            console.error(error);
            messagelist.update((current) => [
                ...current,
                {
                    role: "assistant",
                    content: "Sorry, I could not respond right now.",
                },
            ]);
        }
    }

    async function customerService(newconversationHistory){
        try {
            responseGPT = await customerServiceGPT(newconversationHistory);
            messagelist.update((m) => [...m,{ role: "assistant", content: jsonReformat.userinput }]);
            conversationHistory += `assistant: ${jsonReformat.userinput}\n`;
            console.log(conversationHistory);

            
            let responseGPT;

            if (jsonReformat.action === "modelchange") {
                // Procesar el cambio de modelo
                if (jsonReformat.model == "customerServiceGPT") {
                    console.log("Cambio de modelo detectado:", jsonReformat);
                    return jsonReformat.userinput;
                    // responseGPT = await customerServiceGPT(conversationHistory);
                    // messagelist.update((m) => [...m,{ role: "assistant", content: jsonReformat.userinput }]);
                    // conversationHistory += `assistant: ${jsonReformat.userinput}\n`;
                    // console.log(conversationHistory);
                } else if (jsonReformat.model == "salesGPT") {
                    console.log("Cambio de modelo detectado:", jsonReformat);
                    return jsonReformat.userinput;
                    // responseGPT = await salesGPT(conversationHistory);
                    // messagelist.update((m) => [...m,{ role: "assistant", content: jsonReformat.userinput }]);
                    // conversationHistory += `assistant: ${jsonReformat.userinput}\n`;
                    // console.log(conversationHistory);
                }

            } else {
                // Manejar otros tipos de respuestas JSON
                console.log("Respuesta JSON recibida:", jsonReformat.userinput);
            }
        } catch (error) {
            console.error(error);
            messagelist.update((current) => [
                ...current,
                {
                    role: "assistant",
                    content: "Sorry, I could not respond right now.",
                },
            ]);
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
                75,
                myTextarea.scrollHeight + paddinbottom * 2,
            );
            newline = !newline;
        } else if (!myTextarea.value.trim()) {
            // Si no hay texto, restablece la altura del footer a la mínima
            footerheight = 75;
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
            footerheight = Math.max(75, currentScrollHeight + paddinbottom * 3);
        } else if (currentScrollHeight < currentHeight && lastHeight) {
            // console.log("current",currentHeight,"scroll:",currentScrollHeight)
            lastHeight = currentHeight;
            currentHeight = currentScrollHeight;
            footerheight = Math.max(75, lastHeight);
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

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
<div class="chatbox">
    <div class="chatbox__main" bind:this={chatboxMain}>
        <div class="chatbox__header"></div>
        <div class="chatbox__content">
            {#if $messagelist.length == 0}
    
                <GptInfo
                    gptname={data.pageinfo.nickname}
                    gptlink={"By " + data.pageinfo.biolink}
                    gptdescription={data.pageinfo.bio}
                />
            {:else}
                {#each $messagelist as l}
                    {#if l.role == "assistant"}
                        <GptMessagebox role={l.role} message={l.content} />
                    {:else if l.role == "user"}
                        <!-- {l.content} -->
                        <GptMessagebox role={l.role} message={l.content} />
                    {/if}
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
        background-color: #212121;
        
    }

    .chatbox__header {
        position: sticky;
        top: 0;
        background-color: #171717;
        height: 65px;
        /* height: clamp(65px, 100%, 65px); */
    }

    .chatbox__main {
        display: grid;
        grid-template-rows: 0.1fr auto;
        /* background-color: red; */
        overflow-y: auto;
        /* height: 500%; */
        /* z-index: -1000; */
        /* width: 100%; */
    }
    .chatbox__content {
        display: flex;
        flex-direction: column;
        /* height: 100%; */
        /* width: 100%; */
        width: clamp(450px, 100%, 785px);

        margin: 0 auto;
        /* width: 100%;
        height: 100%; */

        /* background-color: blue; */
    }

    
    .chatbox__footer {
        display: flex;
        position: sticky;
        bottom: 0;
        width: 99%;
        justify-content: center;
        /* height: 65px; */
        background-color: #212121;
    }

    .chatbox__footer-content {
        display: grid;
        grid-template-rows: auto 0.1fr;
        width: clamp(450px, 100%, 785px);
        
        /* margin-left: -16px; */
        /* background-color: blue; */
        /* margin: 0 auto; */
        /* align-items: center; */
    }

    .chatbox__footer-content p {
        /* background-color: red; */
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size: 12px;
        color: #B4B4B4;
        text-align: center;
        height: 20px;
        margin:5px;
    }

    .chatbox__footer-textarea {
        width: clamp(450px, 90%, 785px);
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size: 15px;
        padding: 10px;
        padding-left: 35px;
        padding-right: 65px;
        margin: 0 auto;
        outline: none;
        border-radius: 50px;
        border: none;

        background-color: #2F2F2F;
        /* margin-bottom: 10px; */
        bottom: 0;
        /* max-height: 150px; */
        /* height: 60px; */
        resize: none;
        line-height: 22px;
    }

   
    @media (min-width: 360px) {
        /* .chatbox__footer-content p{
            color: white;
        } */
        .chatbox__main {
            height: calc(90vh);
        }
    }

    /* @media (max-height: 780px) {

        .chatbox__main {
            height: calc(120vh);
        }
    } */

    

    @media (min-width: 375px) {
        /* .chatbox__footer-content p{
            color: white;
        } */
        .chatbox__main {
            height: calc(115.5vh);
        }
    }
    

    @media (min-width: 390px) and (max-width: 393px) {
        /* .chatbox__footer-content p{
            color: white;
        } */
        .chatbox__main {
            height: calc(111.5vh);
        }
    }



    @media (min-width: 412px){

        .chatbox__main {
            height: calc(106.5vh);
        }
        .chatbox__footer-textarea {
            /* background-color: red; */
            width: clamp(0px, 85%, 785px);
            color: #E3E3E3;
            /* margin-left: 20px;
            margin-right: 20px; */
        }
        
    }

     @media (min-width: 414px){

        .chatbox__main {
            height: calc(105vh);
        }
    }

    @media (min-width: 424px){

        .chatbox__main {
            height: calc(101.5vh);
        }
    }

  
</style>

