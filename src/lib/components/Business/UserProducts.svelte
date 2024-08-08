<script>
    import { onMount, onDestroy, createEventDispatcher } from "svelte";
    import { userid, loadMoreProducts ,firstLoadProduct} from "../../API";
    import {
        productList,
        productIndex,
        fullSizeImagesCache,
        lastVisibletest,
        runGridAnimation
    } from "../../stores/adminStore";

    import CreateProduct from "../Business/CreateProduct.svelte";
    import QuestionModal from "../QuestionModal.svelte";
    import DetailsProduct from "./DetailsProduct.svelte";
    import UiProfileComponent from "../ProfileComponent/UIProfileComponent.svelte";
    import Slider from "../ProfileComponent/Slider.svelte";

    //EVENT DISPATCHER
    const dispatch = createEventDispatcher();

    export let images = [];

    // let products = [];
    let lastVisible = null;
    let loadmore = true;

    let isOpenCreateProductModal = false;
    let modalOpenDetailsProduct = false;

    let imageLoaded = true;

    export let isOpen = false;
    export let questionModalIsOpen = false;
    export let close;

    let runAnimation = false;

    let loadmoreAnimation = false;
    let scrollContainer;

    //LOAD PRODUCT + ORIGINAL IMAGE CACHE
    onMount(async () => {
        // scrollContainer.addEventListener('scroll', handleScroll);
        if (scrollContainer) {
            scrollContainer.addEventListener('scroll', handleScroll);
            
        }
        // console.log("asasas")
        if ($productList.length == 0) {
            const { products: initialProducts, lastVisible: newLastVisible} = await firstLoadProduct($userid);
            $productList = initialProducts.map((product) => ({
                ...product,
                opacity: 1,
            }));
            lastVisible = newLastVisible;
            $lastVisibletest = newLastVisible
            console.log(newLastVisible)
            // preloadFullSizeImages();
        }
    });


    function handleScroll() {
        let threshold = scrollContainer.scrollHeight - (scrollContainer.clientHeight * 1.5); // Umbral antes de llegar al final
        if (scrollContainer.scrollTop >= threshold && !loadmoreAnimation) {
            console.log("Llegó al final del contenedor!");
            // Cargar más datos o realizar otra acción
        if($lastVisibletest != null){
            loadmoreAnimation = true;
             handleLoadMore()
            console.log("asdasdasd")
        }
        }
    }


    async function handleLoadMore() {
        const { products: newProducts, lastVisible: newLastVisible } = await loadMoreProducts($lastVisibletest, $userid);
        // $productList = newProducts.map((product) => ({...product,opacity: 0}));
        $productList = [...$productList, ...newProducts];
        $lastVisibletest = newLastVisible;
        // productList.set($productList);
        // preloadFullSizeImages(newProducts);
         loadmoreAnimation = false;
        // console.log(products);
    }
    
    //     function preloadFullSizeImages(products = $productList) {
    //     products.forEach(product => {
    //         const img = new Image();
    //         img.src = product.image; // URL de la imagen de alta resolución
    //         img.onload = () => {
    //             fullSizeImagesCache.update(cache => {
    //                 cache[product.id] = img.src;
    //                 return cache;
    //             });
    //             console.log(`Preloaded: ${img.src}`);
    //         };
    //     });
    // }

    //PRE-LOAD FULL IMAGE CACHE
    function preloadFullSizeImages() {
        $productList.forEach((product) => {
            const img = new Image();
            img.src = product.image; // Asume que `image` es la URL de la imagen de alta resolución
            img.onload = () => {
                fullSizeImagesCache.update((cache) => {
                    cache[product.id] = img.src;
                    return cache;
                });
                console.log(`Preloaded: ${img.src}`);
            };
        });
    }

    //LOAD MORE PRODUCTO
    // async function handleLoadMore() {
    //     const { products: newProducts, lastVisible: newLastVisible } =
    //         await loadMoreProducts($lastVisibletest, $userid);
    //     // $productList = newProducts.map((product) => ({...product,opacity: 0}));
    //     $productList = [...$productList, ...newProducts];
    //     $lastVisibletest = newLastVisible;
    //     // productList.set($productList);
    //     preloadFullSizeImages();
    //     // console.log(products);
    // }

    //IMAGE ON COMPLETE
    function handleImageLoad(index) {
        // setTimeout(() => {
        imageLoaded = true; // Esto activará la clase para hacer visible la imagen
        runAnimation = false;
        $productList[index].opacity = 1; // Cambia la opacidad a 1 después de la carga
        // Actualiza el store para reactividad
        // console.log($productList[index]);
         console.log($lastVisibletest);
        // $productList = $productList.map((product) => ({ ...product }));
        // }, 500); // Retraso de 1 segundo
    }

    //EVENT DISPATCH TO PARENT

    function closeUserProductModal() {
        dispatch("close");
    }

    function toggleCreateProductModal() {
        isOpenCreateProductModal = !isOpenCreateProductModal;
    }

    function toggleModalDetailsProduct() {
        modalOpenDetailsProduct = !modalOpenDetailsProduct;
        
    }

    function gridLoadingAnimation(event) {
        isOpenCreateProductModal = false;
        // preloadFullSizeImages() 
        $runGridAnimation = event.detail.showalert;
        console.log($productList,"producto");
    }

    function eventHandler(index) {
        $productIndex = index;
        // questionModalIsOpen = !questionModalIsOpen;
        modalOpenDetailsProduct = !modalOpenDetailsProduct;
    }

    function toggleModalQuestion(event) {
        if (event.detail.object == "edit") {
        } else if (event.detail.object == "delete") {
        } else if (event.detail.object == "cancel") {
            questionModalIsOpen = !questionModalIsOpen;
        }
        // openQuestionModal()
    }
</script>

{#if isOpen}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="modal-backdrop" on:click={close}>
        
        <div class="modal-content" on:click|stopPropagation bind:this={scrollContainer}  style="overflow-y: auto; height: 100%;">
            <!-- <slot></slot>  -->
             
            <!-- <button on:click={close}>Close</button> -->
            <div class="topbar">
                <button class="Add" on:click={closeUserProductModal}>x</button>
                <p>Product</p>
                <button class="Add" on:click={toggleCreateProductModal}>+</button>
            </div>
            <!-- <UiProfileComponent/> -->
            <!-- <Slider/> -->
            <div class="grid" >
                <!-- <button class="load-more-button" on:click={toggleModal}>+</button> -->
                {#if $runGridAnimation}
                    <button class="load-more-button">+</button>
                {/if}
                {#each $productList as image, index}
                    <!-- svelte-ignore missing-declaration -->
                    <div class="image-cell">
                        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                        <img
                            src={image.thumbs}
                            on:click={() => eventHandler(index)}
                            style="opacity: {image.opacity};"
                            alt="Imagen descriptiva"
                            on:load={() => handleImageLoad(index)}
                        />
                    </div>
                {/each}
                
                <button class="load-more-button" on:click={handleLoadMore}
                    >+</button
                >
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
            </div>
            <button>asdasdas</button> 
        </div>
    </div>
    
    {#if isOpenCreateProductModal}
        <CreateProduct
            isOpen={isOpenCreateProductModal}
            on:close={toggleCreateProductModal}
            on:publish={gridLoadingAnimation}/>
    {/if}
   

    {#if modalOpenDetailsProduct}
        <DetailsProduct
            isOpen={modalOpenDetailsProduct}
            on:close={toggleModalDetailsProduct}
            on:publish={gridLoadingAnimation}
        ></DetailsProduct>
    {/if}

    <QuestionModal
        isOpen={questionModalIsOpen}
        on:close1={toggleModalQuestion}
    />
    
{/if}

<style>
    *{
        /* margin: 0; */
    }
    .modal-backdrop {
        /* position: fixed;
        top: 0;
        left: 0; */
        width: 100%;
        height: 100%;
        background-color: #212121;
        display: flex;
        /* justify-content: center; */
        /* align-items: center; */
        z-index: 999; /* Asegúrate de que el modal esté sobre otros elementos */
    }

    .modal-content {
        flex: 1;
        /* background-color: red; */
        /* height: 100%;
        overflow-y: auto; */
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
            3,
            1fr
        ); /* 3 columnas en todas las resoluciones */
        gap: 2px;
        overflow-y: auto;
    }

    .image-cell {
        display: flex;
        align-items: center; /* Centra verticalmente */
        justify-content: center; /* Centra horizontalmente */
        height: auto;
        background-color: #f0f0f0;
        aspect-ratio: 1/1;
    }

    .image-cell img {
        opacity: 0;
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
        height: auto;
        color: white;
        background-color: #333;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 60px;
        aspect-ratio: 1/1;
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
