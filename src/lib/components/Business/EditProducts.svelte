<script>
    import { onMount } from "svelte";
    import { browser } from '$app/environment';

    let myTextarea;
    let keyboardPadding = 0; // Almacenar el padding del teclado

 

    // Ajustar el padding según el cambio de altura de la ventana
    function adjustPadding() {
        const originalHeight = window.innerHeight;
        return () => {
            const currentHeight = window.innerHeight;
            keyboardPadding = originalHeight - currentHeight > 100 ? originalHeight - currentHeight : 0;
        };
    }

    if (browser) {
        onMount(() => {
            if (myTextarea) {
            myTextarea.focus();
        }
            window.addEventListener("resize", adjustPadding);
            adjustPadding(); // Verificar inmediatamente en la carga de la página

            return () => {
                window.removeEventListener("resize", adjustPadding);
            };
        });
    }

    // Limpiar el listener al destruir el componente

</script>

<div class="overlay" style="padding-bottom: {keyboardPadding}px;">
    <div class="header"></div>
    <div class="container">
        <div class="content">
            <button>a</button>
            <textarea
                bind:this={myTextarea}
                placeholder="Escribe algo..."
            ></textarea>
        </div>
    </div>
</div>

<style>
    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #333;
        color: white;
        z-index: 1000;
    }

    .header {
        height: 50px;
        background-color: red;
    }

    .container {
        display: flex;
        flex-direction: column;
        height: 100%;
        background-color: aqua;
        overflow-y: auto;
    }

    .content {
        display: flex;
        flex-direction: column;
        background-color: aqua;
    }

    .content button, .content textarea {
        width: 100%;
    }

    .content button{
        height: 600px;
    }
    .content textarea {
        height: 80px;
    }
</style>
