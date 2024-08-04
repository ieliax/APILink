<script>
    import { onMount, onDestroy,createEventDispatcher  } from "svelte";
    import { browser } from "$app/environment";
    import { serverTimestamp } from "firebase/firestore";
    import { uploadImage, userid, loadMoreProducts } from "../../API";
    import {
        productList,
        productIndex,
        fullSizeImagesCache,
    } from "../../stores/adminStore";
    import CreateProduct from "../Business/CreateProduct.svelte";
    import QuestionModal from "../QuestionModal.svelte";

    const dispatch = createEventDispatcher();

    export let images = [];
    let itemRefs = [];
    let products = [];
    let lastVisible = null;
    let loadmore = true;

    let modalOpen = false;
    let imageLoaded = true;

    export let isOpen = false;
    export let questionModalIsOpen = false;
    export let close;

    let runAnimation = false;

    onMount(async () => {
        // const { products: initialProducts, lastVisible: newLastVisible } =
        //     await loadMoreProducts(null, $userid);

        // $productList = initialProducts.map(product => ({ ...product, opacity: 0 }));
        // lastVisible = newLastVisible;
        console.log($fullSizeImagesCache); // Verifica las referencias
        // if (itemRefs[$productIndex]) {
        //     setTimeout(() => {
        //     itemRefs[$productIndex].scrollIntoView({ behavior: 'auto', block: 'start' });
        //     }, 0);
        // }
    });

    function toggleModal() {
        modalOpen = !modalOpen;
    }

    function gridLoadingAnimation(event) {
        modalOpen = false;
        runAnimation = event.detail.showalert;
        console.log(runAnimation);
    }

    function eventHandler(index) {
        // $productIndex = index;
        questionModalIsOpen = !questionModalIsOpen;
    }

    function toggleModalQuestion(event) {
        if (event.detail.object == "edit") {
        } else if (event.detail.object == "delete") {
        } else if (event.detail.object == "cancel") {
            questionModalIsOpen = !questionModalIsOpen;
        }
        // openQuestionModal()
    }

    function handleImageLoad(index) {
        // setTimeout(() => {
        imageLoaded = true; // Esto activará la clase para hacer visible la imagen
        runAnimation = false;
        $productList[index].opacity = 1; // Cambia la opacidad a 1 después de la carga
        // Actualiza el store para reactividad
        console.log($productList[index]);
        $productList = $productList.map((product) => ({ ...product }));
        // }, 500); // Retraso de 1 segundo
    }

    function handleImageLoaded(index) {
        if (itemRefs[$productIndex]) {
            itemRefs[$productIndex].scrollIntoView({behavior: "auto",block: "start"});
            setTimeout(() => {
               
                $productList[index].opacity = 1; // Asegura que la imagen sea visible una vez cargada
                productList.set($productList); // Actualiza el store para asegurar la reactividad
            }, 1000);
        }
    }

    function onClose(){
        dispatch("close")
    }
</script>

{#if isOpen}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="modal-backdrop" on:click={close}>
        <div class="modal-content" on:click|stopPropagation>
            <!-- <slot></slot>  -->
            <!-- <button on:click={close}>Close</button> -->
            <div class="topbar">
                <button class="Add" on:click={onClose}></button>
                <p>Product</p>
                <button class="Add" on:click={toggleModal}>+</button>
            </div>

            <div class="grid">
                <!-- <button class="load-more-button" on:click={toggleModal}>+</button> -->
                {#if runAnimation}
                    <button class="load-more-button">+</button>
                {/if}
                {#each $productList as image, index}
     
                    <div class="image-cell" bind:this={itemRefs[index]}>
                     
                         <div class="cellheader">
                           
                         </div>
                        
                        <img
                            src={$fullSizeImagesCache[image.id]}
                            on:load={() => handleImageLoaded(index)}
                            on:click={() => eventHandler(index)}
                            style="opacity: {image.opacity}; aspect-ratio: {image.aspectRatio}"
                            
                            alt="Imagen descriptiva"
                        />
                    </div>
                {/each}
                <!-- <div class="image-cell"  bind:this={itemRefs[$productIndex]}>
                 
                     <div class="cellheader">
                       asdasd
                     </div>
                    
                    <img
                        src={$fullSizeImagesCache[$productList[$productIndex].id]}
                        on:load={() => handleImageLoaded($productIndex)}
                        on:click={() => eventHandler($productIndex)}
                        style="opacity: {$productList[$productIndex].opacity}; aspect-ratio: {$productList[$productIndex].aspectRatio}"
                        alt="Imagen descriptiva"
                    />
                </div> -->

                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
            </div>
        </div>
    </div>
    <!-- <CreateProduct
        isOpen={modalOpen}
        on:close={toggleModal}
        on:publish={gridLoadingAnimation}
    ></CreateProduct> -->

    <QuestionModal
        isOpen={questionModalIsOpen}
        on:close1={toggleModalQuestion}
    />
{/if}

<style>
    .modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #212121;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 999; /* Asegúrate de que el modal esté sobre otros elementos */
    }

    .modal-content {
        flex: 1;
        /* background-color: red; */
        height: 100%;
        overflow-y: auto;
    }

    .topbar {
        /* flex: 1;
        display: flex;
        background-color: rebeccapurple;
        height: 60px;
        justify-content: center;
        align-items: center; */

        display: grid;
        position: sticky;
        top: 0;
        grid-template-columns: 0.1fr 1fr 0.1fr;
        background-color: #212121;
        height: 60px;
        border-bottom: 1px solid #ccc;
    }
    .topbar p {
        /* background-color: red; */
        text-align: center;
    }
    .topbar button {
        width: 60px;
        /* background-color: greenyellow; */
    }

    .grid {
        display: grid;
        grid-template-columns: repeat(
            1,
            1fr
        ); /* 3 columnas en todas las resoluciones */
        gap: 2px;
    }

    .image-cell {
        display: flex;
        flex-direction: column;
        align-items: center; /* Centra verticalmente */
        justify-content: center; /* Centra horizontalmente */
        /* height: auto; */
        background-color: #e90d0d;
        aspect-ratio: auto;
        scroll-margin-top: 60px;
    }

    .cellheader{
        height: 60px;
    }

    .image-cell img {
        /* opacity: 0; */
        background-color: rebeccapurple;
        /* transition: opacity 1s ease-in-out; */
        width: 100%; /* Cubre todo el ancho de la celda */
        height: 100%; /* Cubre todo el alto de la celda */
        object-fit: cover; /* Mantiene las proporciones sin recortar */
    }

    .image-visible {
        opacity: 1; /* Opacidad total */
        /* transition: opacity 1s ease-in-out; */
    }

    .load-more-cell {
        height: 50px;
        cursor: pointer;
        color: #333; /* Color del texto para el botón 'Cargar más' */
        font-size: 16px; /* Tamaño del texto ajustado para visibilidad */
        background-color: transparent; /* Fondo transparente o ajusta según el diseño deseado */
        width: 100%; /* Asegura que ocupe toda la celda */
    }

    .load-more-button {
        color: white;
        background-color: transparent;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 60px;
    }
    .Add {
        color: white;
        background-color: transparent;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 40px;
    }
</style>
