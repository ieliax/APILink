<script>
    import {onMount, onDestroy } from "svelte";

    export let message = `¡Genial! Has elegido la Pizza Margarita Clásica, una pizza tradicional con salsa de tomate fresco, mozzarella y albahaca, horneada a la perfección, y en oferta de 2x1.

Para completar tu compra, te recomiendo considerar nuestros Palitos de Mozzarella y una Ensalada César. Los palitos de mozzarella son un delicioso aperitivo empanizado y frito, servido con salsa marinara, mientras que la ensalada es una fresca combinación de lechuga romana, crutones, queso parmesano y aderezo César, ideal para complementar tu pizza.`;
    const imageurl =
        "https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/640px-Starbucks_Corporation_Logo_2011.svg.png";

    let myTextarea;

    export let role;
    export let crossell;
    let container;

    
    // Mytextarea.scrollTop = Mytextarea.scrollHeight;
    onMount(() => {
        // window.addEventListener('resize', adjustTextareaHeight);
        adjustTextareaHeight();
        console.log(crossell)
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
            <div class="cross-sell-container" bind:this={container}>
                {#each crossell as item }
                    <div class="item">
                        <img src="https://scontent-lga3-1.xx.fbcdn.net/v/t39.30808-6/452605479_905987121556186_7337387986837180284_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_ohc=15UIPwWkCxQQ7kNvgH1VW3D&_nc_ht=scontent-lga3-1.xx&oh=00_AYBxMty7CSnCEjHoOewPdVpPRqLdAJNkcuomw5ts59aksw&oe=66A87BFA" alt="">
                <!-- <img src="https://scontent-lga3-1.xx.fbcdn.net/v/t39.30808-6/452605479_905987121556186_7337387986837180284_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_ohc=15UIPwWkCxQQ7kNvgH1VW3D&_nc_ht=scontent-lga3-1.xx&oh=00_AYBxMty7CSnCEjHoOewPdVpPRqLdAJNkcuomw5ts59aksw&oe=66A87BFA" alt=""> -->
                    </div>
                {/each}
            </div>
            <div class="buttonSection">
                <button>Agregar Productos</button>
                <button>No,Gracias</button>
                <!-- <button>Aceptar</button> -->
            </div>
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
        flex-direction: column;
        /* background-color: rosybrown; */
        width: 100%;
    }
    .cross-sell-container {
        display: flex;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        gap: 10px;
        padding: 10px;
    }
    .item {
        flex: 0 0 60%;
        scroll-snap-align: start;
        position: relative;
    }
    .cross-sell-container img {
        width: 100%;
        height: 100%;
        display: block;
        border-radius: 10px;
    }
    .buttonSection{
        /* display: flex; */
        flex-direction: row;
        gap: 5px;
    }
    .buttonSection button{
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        padding: 10px;
        font-weight: 600;
        padding-inline: 14px;
        border-radius: 20px;
        margin-top: 5px;
        font-size: 12px;
        outline: none;
        border: none;
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
