<script>
    import { onMount, onDestroy } from "svelte";
    import { browser } from "$app/environment";
    import { serverTimestamp } from "firebase/firestore";
    import { uploadImage, userid, loadMoreProducts } from "../API";
    import { productList } from "../stores/adminStore";
    import Modal from "./Modal.svelte";

    export let images = [];
    let products = [];
    let lastVisible = null;
    let loadmore = true;

    let modalOpen = false;

    export let isOpen = false;
    export let close;

    let runAnimation = false;

    onMount(async () => {
        const { products: initialProducts, lastVisible: newLastVisible } = await loadMoreProducts(null, $userid);

        $productList = initialProducts;
        lastVisible = newLastVisible;
        // console.log(products)
    });

    async function handleLoadMore() {
        const { products: newProducts, lastVisible: newLastVisible } =
            await loadMoreProducts(lastVisible, $userid);

        if (newProducts.length === 0) {
            console.log("No hay más productos para cargar.");
            loadmore = false;
            // Aquí puedes, por ejemplo, deshabilitar el botón de cargar más o ajustar la UI para reflejar que no hay más datos.
            return; // Detener la ejecución para evitar agregar más productos o cambiar el cursor
        }

        products = [...products, ...newProducts];
        lastVisible = newLastVisible;
        console.log(products);
    }

    function toggleModal() {
        modalOpen = !modalOpen;
    }

    function toggleModalRunAnimation(event) {
        modalOpen = !modalOpen;
        runAnimation = event.detail.showalert;
        console.log(runAnimation)
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
                <button class="Add" on:click={close}></button>
                <p>Create Product</p>
                <button class="Add" on:click={toggleModal}>+</button>
            </div>

            <div class="grid">
                {#if runAnimation}
                <button class="load-more-button" on:click={toggleModal}>+</button>
                {/if}
                {#each $productList as image}
                  <div class="image-cell">
                    <img src={image.thumbs} alt="Imagen descriptiva">
                  </div>
                {/each}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                
              
              </div>
        </div>
    </div>
    <Modal isOpen={modalOpen} on:close={toggleModal} on:publish={toggleModalRunAnimation}>
        <p>This is the content inside the modal!</p>
    </Modal>
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
        /* background-color: rebeccapurple; */
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
    grid-template-columns: repeat(3, 1fr); /* 3 columnas en todas las resoluciones */
    gap: 2px;
    /* background-color: red; Solo para demostración, puedes quitarlo */
  }

  .image-cell {
   
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f0f0f0; /* Fondo uniforme para todas las celdas */
  }

  .image-cell img {
    width: 100%; /* Cubre todo el ancho de la celda */
    height: 100%; /* Cubre todo el alto de la celda */
    object-fit: cover; /* Mantiene las proporciones sin recortar */
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
  .Add{
    color: white;
    background-color: transparent;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 40px;
  }
</style>
