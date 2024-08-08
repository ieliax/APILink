<script>
    import { onMount, tick } from "svelte";
    import ImageGrid from "./ImageGrid.svelte";
    // import Modal from "./CreateProduct.svelte";
    import UserProducts from "./Business/UserProducts.svelte"
    import { productList } from "../stores/adminStore";
    import UiProfileComponent from "./ProfileComponent/UIProfileComponent.svelte";
    export let gptname;
    export let gptlink;
    export let gptdescription;

    let modalOpen = false;
    let isOpenUserProductModal = false;
    let modalOpen3 = false;
    // UserProductView

    const imageurl =
        "https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/640px-Starbucks_Corporation_Logo_2011.svg.png";

    onMount(() => {
        function setVH() {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty("--vh", `${vh}px`);
        }
        // console.log(uid)
        setVH();
        // Ejecuta la función al cargar la página
        window.addEventListener("resize", setVH);

        // Asegúrate de actualizar la altura cuando se cambie el tamaño de la ventana
        window.addEventListener("resize", setVH);
    });


    function toggleModal() {
        modalOpen = !modalOpen;
    }
    function toggleUserProductModal() {
        isOpenUserProductModal = !isOpenUserProductModal;
    }
    function toggleModal3() {
        modalOpen3 = !modalOpen3;
    }

</script>

<div class="gptinfo">
    <div class="gptinfo__container">
        <img src={imageurl} alt="" />
        <div class="content">
            <h1>{gptname}</h1>
            <p class="content-link">{gptlink}</p>
            <p class="content-description">{gptdescription}</p>
        </div>
        <!-- <ImageGrid images={images}/> -->
        <div class="button-container">
            <button class="custom-button" on:click={toggleModal}>Product</button>
            <button class="custom-button" on:click={toggleUserProductModal}>FAQS</button>
            <button class="custom-button" on:click={toggleModal3}>Button 3</button>
        </div>
    </div>
    <!-- <Modal isOpen={modalOpen} close={toggleModal}/> -->
    
    {#if isOpenUserProductModal}
        <!-- <UserProducts isOpen={isOpenUserProductModal} on:close={toggleUserProductModal}/>    -->
        <UiProfileComponent/>
    {/if}
    
    
   
    
</div>

<style>
    * {
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
        margin: 0;
        padding: 0;
        color: white;
    }

    .gptinfo {
        /* height: 100%; */
    }

    .gptinfo__container {
        display: flex;
        flex-direction: column;
        /* width: 100%; */

        height: 305px;
        margin-top: 175px;
        background-color: #212121;
        align-items: center;
        gap: 11px;
    }
    .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
    }
    .content-description {
        font-size: 14px;
        color: white;
        text-align: center;
        margin-inline: 40px;
        letter-spacing: -0.1px;
    }
    .content-link {
        font-size: 14.2px;
        color: #c9c9c9;
        letter-spacing: -0.1px;
    }
    .gptinfo__container img {
        width: 50px;
        height: 50px;
        border: 1px solid #383838;
        border-radius: 50px;
    }
    .gptinfo__container h1 {
        font-size: 24px;
        color: white;
        font-weight: 500;
        /* letter-spacing: -1px; */
    }
    .gptinfo__container p {
        /* font-weight: 500; */
    }

    .button-container {
        display: flex;
        justify-content: center;
        gap: 10px; /* Espacio entre los botones */
    }

    .custom-button {
        background-color: white; /* Fondo blanco para los botones */
        color: black; /* Texto en color negro */
        border: none;
        border-radius: 30px;
        padding: 10px 20px;
        cursor: pointer;
        transition:
            background-color 0.3s,
            color 0.3s;

        /* Estilos adicionales para efectos de hover */
        &:hover {
            background-color: grey; /* Cambia el color de fondo al hacer hover */
            color: white;
        }
    }
    @media (min-width: 768px) {
        .gptinfo__container h1 {
            font-size: 24px;
            color: white;
            font-weight: 500;
            /* letter-spacing: -1px; */
        }
        .content-description {
            font-size: 14.2px;
            color: white;
            text-align: center;
            margin-inline: 100px;
            letter-spacing: -0.1px;
        }
    }
</style>
