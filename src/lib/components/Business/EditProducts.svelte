<script>
    import { onMount, onDestroy, createEventDispatcher } from "svelte";
    import { browser } from "$app/environment";
    import {
        productList,
        productIndex,
        description,
    } from "../../stores/adminStore";
    import { serverTimestamp } from "firebase/firestore";
    import {
        uploadImage,
        userid,
        createProduct,
        updateProduct,
    } from "../../API";
    import { v4 as uuidv4 } from "uuid";
    import PostHeader from "../PostComponent/PostHeader.svelte";

    const dispatch = createEventDispatcher();

    export let isOpen = false;
    export let close;
    export let publish;

    let imageAspectRatio = "1 / 1"; // Valor predeterminado

    let fileInput;

    let myTextarea;

    let imageUrl = "imageplaceholder.jpg";
    let resizedImageBlob;
    let resizedThumbImageBlob;

    console.log(uuidv4());

    onMount(() => {
        // window.addEventListener('resize', adjustTextareaHeight);
        myTextarea.focus();
        adjustTextareaHeight();
        console.log(window.innerWidth);
        // fileInput.addEventListener("change", handleFileChange);
        myTextarea.value = $productList[$productIndex].description;
    });

    function adjustTextareaHeight() {
        // Establecer altura automáticamente basada en el contenido
        if (myTextarea) {
            myTextarea.style.height = "auto";
            myTextarea.style.height = `${myTextarea.scrollHeight - 10}px`;
            // console.log(window)
        }
    }

    onDestroy(() => {
        if (imageUrl) {
            URL.revokeObjectURL(imageUrl);
        }
    });

    async function updateProductOnFirebase() {
        const objectProduct = {
            description: myTextarea.value,
        };

        const docID = $productList[$productIndex].id;
        //
        const response = await updateProduct(
            `products/${$userid}/userProducts`,
            objectProduct,
            docID,
        );

        if (response.success) {
            console.log("Producto actualizado con éxito:", docID);
            // Actualizar el producto en la lista local
            productList.update((currentProducts) => {
                const updatedProducts = currentProducts.map((product) => product.id === docID ? { ...product, ...objectProduct } : product);
                dispatch("close");
                return updatedProducts;
            });
        } else {
            console.error("Error al actualizar el producto:", response.error);
        }
        // onPublish(false); // Desactivar el loader una vez todo ha finalizado
    }

    function onClose() {
        if (imageUrl) {
            imageUrl = "imageplaceholder.jpg";
        }
        dispatch("close");
    }

    function onPublish(loading) {
        if (imageUrl) {
            imageUrl = "imageplaceholder.jpg";
        }
        dispatch("publish", { showalert: loading });
    }
    function eventHandler(index) {
        // $productIndex = index;
        // console.log($productList[$productIndex].id)
        // questionModalIsOpen = !questionModalIsOpen;
    }
</script>

{#if isOpen}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="modal-backdrop">
        <div class="modal-content">
            <!-- <slot></slot>  -->
            <!-- <button on:click={close}>Close</button> -->
            <div class="topbar">
                <button on:click={() => onClose(true)}>close</button>
                <p>Create Product</p>
                <button on:click={updateProductOnFirebase}>publicar</button>
            </div>
            <div class="container">
                <PostHeader />

                <img
                    class="logo"
                    src={$productList[$productIndex].image}
                    alt="logo"
                    on:click={() => fileInput.click()}
                    style="aspect-ratio: {imageAspectRatio}; object-fit: cover;"
                />
                <textarea
                    name=""
                    bind:this={myTextarea}
                    on:input={adjustTextareaHeight}
                    placeholder="¡Genial! Has elegido la Pizza Margarita Clásica, una pizza tradicional con salsa de tomate fresco, mozzarella y albahaca, horneada a la perfección, y en oferta de 2x1. Para completar tu compra, te recomiendo considerar nuestros Palitos de Mozzarella y una Ensalad"
                ></textarea>
            </div>
        </div>
    </div>
{/if}

<style>
    .modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 1); /* Fondo semitransparente */
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
        background-color: rebeccapurple;
        height: 60px;
    }
    .topbar p {
        background-color: red;
        text-align: center;
    }
    .topbar button {
        width: 60px;
        background-color: greenyellow;
    }

    .container {
        display: flex;
        flex-direction: column;
    }

    .container img {
        width: 100%;
        height: auto;
        display: block;
        border-radius: 5px;
        object-fit: cover;

        /* aspect-ratio: 4 / 5; */
        /* margin-left: 10px; */
        /* margin: 10px; */
    }
    .container textarea {
        font-family: Roboto;
        font-size: 14px;
        width: 90%;
        resize: none;
        overflow-y: hidden;
        outline: none;
        border: none;
        color: #e3e3e3;
        background-color: transparent;
        /* align-content: center; */
        margin-top: 0px;
        line-height: 25px;
        margin: 10px;
        /* overflow-y: auto; */
        /* line-height: 25px; */
        /* padding: 5px; */
        /* box-sizing: border-box; */
        /* padding: 10px; */
    }

    /* 
    .modal-content {
        background: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        position: relative; 
    } */

    /* button {
        position: absolute;
        top: 10px;
        left: 10px;
        cursor: pointer;
    } */
</style>
