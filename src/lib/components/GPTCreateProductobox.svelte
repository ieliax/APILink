<script>
    import { onMount, onDestroy } from "svelte";
    import { serverTimestamp } from "firebase/firestore";
    import { uploadImage, userid, createProduct} from "../API";

    export let message = `¡Genial! Has elegido la Pizza Margarita Clásica, una pizza tradicional con salsa de tomate fresco, mozzarella y albahaca, horneada a la perfección, y en oferta de 2x1.

Para completar tu compra, te recomiendo considerar nuestros Palitos de Mozzarella y una Ensalada César. Los palitos de mozzarella son un delicioso aperitivo empanizado y frito, servido con salsa marinara, mientras que la ensalada es una fresca combinación de lechuga romana, crutones, queso parmesano y aderezo César, ideal para complementar tu pizza.`;
    const imageurl =
        "https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/640px-Starbucks_Corporation_Logo_2011.svg.png";

    let myTextarea;

    export let role;
    export let crossell;
    let fileInput;
    let container;
    let imageUrl = "imageplaceholder.jpg";
    let resizedImageBlob;

    // Mytextarea.scrollTop = Mytextarea.scrollHeight;

    function adjustTextareaHeight() {
        // Establecer altura automáticamente basada en el contenido
        if (myTextarea) {
            myTextarea.style.height = "auto";
            myTextarea.style.height = `${myTextarea.scrollHeight - 0}px`;
            // console.log(window)
        }
    }

    console.log($userid);
    onMount(() => {
        // window.addEventListener('resize', adjustTextareaHeight);
        adjustTextareaHeight();
        console.log(window.innerWidth);
        fileInput.addEventListener("change", handleFileChange);
    });

    onDestroy(() => {
        if (imageUrl) {
            URL.revokeObjectURL(imageUrl);
        }
        fileInput.removeEventListener("change", handleFileChange);
        // window.removeEventListener('resize', adjustTextareaHeight); // Limpiar el listener al destruir el componente
    });

    function upload() {
        fileInput.click(); // Abre el diálogo de selección de archivo
    }

    function handleFileChange(event) {
        const file = event.target.files[0];
        if (file) {
            // Revoca la URL anterior si existe
            if (imageUrl) {
                URL.revokeObjectURL(imageUrl);
            }

            // Crea un objeto de imagen para verificar las dimensiones
            const img = new Image();
            img.onload = () => {
                // Calcula la relación de aspecto
                const aspectRatio = img.width / img.height;

                const file = event.target.files[0];
                if (file) {
                    resizeImage(file, 1080, 1080, (blob) => {
                        if (imageUrl) {
                            URL.revokeObjectURL(imageUrl);
                        }
                        resizedImageBlob = blob;
                        imageUrl = URL.createObjectURL(blob);
                    });
                }
            };
            img.onerror = () => {
                alert("No se pudo cargar la imagen.");
            };
            img.src = URL.createObjectURL(file);
        }
    }

    function resizeImage(file, maxWidth, maxHeight, callback) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = new Image();
            img.onload = function () {
                const canvas = document.createElement("canvas");
                let width = img.width;
                let height = img.height;

                // Ajustar la imagen a la proporción deseada
                if (width > height) {
                    if (width > maxWidth) {
                        height *= maxWidth / width;
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width *= maxHeight / height;
                        height = maxHeight;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, width, height);

                canvas.toBlob(
                    function (blob) {
                        callback(blob);
                    },
                    "image/jpeg",
                    0.85,
                ); // Ajusta la calidad de la imagen aquí, 0.85 es típicamente bueno
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    function uploadImageToFirebase() {
        if (!resizedImageBlob) {
            console.error("No hay imagen redimensionada para subir.");
            return;
        }

        const uid = $userid;
        const filenamePrefix = "resized-image";
        const timestamp = new Date().getTime();
        uploadImage(uid, filenamePrefix + timestamp, resizedImageBlob)
            .then((downloadURL) => {
                console.log("Imagen subida con éxito:", downloadURL);

                const objectProduct = {
                    name: "NEW GPT",
                    description: "DETALLADO",
                    image:downloadURL,
                    campoOrdenar:"4",
                    timestamp: serverTimestamp(),
                };
                createProduct(`products/${$userid}/userProducts`,objectProduct);
            })
            .catch((error) => {
                console.error("Error al subir la imagen:", error);
            });
    }
</script>

<div class="messagebox">
    <div class="messagebox__container">
        {#if role == "assistant"}
            <img src={imageurl} alt="" />
            <div class="messagebox__container-message">
                <div class="cross-sell-container" bind:this={container}>
                    {#each crossell as item}
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <div class="item">
                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                            <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                            <img
                                src={imageUrl}
                                alt=""
                                on:click={upload}
                                on:change={handleFileChange}
                            />
                            <input
                                type="file"
                                bind:this={fileInput}
                                class="hidden"
                                onchange={handleFileChange}
                                accept="image/*"
                            />
                            <!-- <div class="image-info">
                                <p>{item.productName}</p>
                                <button>Agregar</button>
                            </div> -->

                            <!-- <img src="https://scontent-lga3-1.xx.fbcdn.net/v/t39.30808-6/452605479_905987121556186_7337387986837180284_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_ohc=15UIPwWkCxQQ7kNvgH1VW3D&_nc_ht=scontent-lga3-1.xx&oh=00_AYBxMty7CSnCEjHoOewPdVpPRqLdAJNkcuomw5ts59aksw&oe=66A87BFA" alt=""> -->
                        </div>
                    {/each}
                </div>
                <textarea
                    name=""
                    bind:this={myTextarea}
                    on:input={adjustTextareaHeight}
                    placeholder="¡Genial! Has elegido la Pizza Margarita Clásica, una pizza tradicional con salsa de tomate fresco, mozzarella y albahaca, horneada a la perfección, y en oferta de 2x1. Para completar tu compra, te recomiendo considerar nuestros Palitos de Mozzarella y una Ensalad"
                    >{message}</textarea
                >
                <div class="buttonSection">
                    <!-- <button>Agregar Productos</button> -->
                    <button on:click={uploadImageToFirebase}>Publicar</button>
                    <!-- <button>Aceptar</button> -->
                </div>
            </div>
        {/if}
    </div>
</div>

<style>
    * {
        margin: 0;
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
    }
    .hidden {
        display: none;
    }
    .messagebox__container {
        display: flex;
        flex-direction: row;
        /* background-color: aqua; */
        gap: 10px;
        width: 95%;
        /* height: auto; */
        margin-bottom: 20px;
        margin: 10px;
    }

    .messagebox__container img {
        width: 30px;
        height: 30px;
        object-fit: cover;
        cursor: pointer;
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
        /* width: 100%; */
        /* background-color: #b60707; */
        border-radius: 10px;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        gap: 10px;
        /* padding: 10px; */
    }

    .item {
        flex: 0 0 100%;
        scroll-snap-align: start;
        position: relative;
    }
    .item p {
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
        color: white;
        font-size: 14px;
    }

    /* @media (min-width: 1024px) {
        .item {
            flex: 0 0 40%;
        }
    } */
    .cross-sell-container img {
        width: 100%;
        height: auto;
        display: block;
        border-radius: 5px;
        object-fit: cover;
        aspect-ratio: 1 / 1;
        /* margin-left: 10px; */
        /* margin: 10px; */
    }
    @media (min-width: 768px) {
        .item {
            flex: 0 0 85%;
        }
        .cross-sell-container img {
            /* width: 100%; */
            height: 580px;
            width: 100%;
            /* height: auto; */
            display: block;
            border-radius: 5px;
            object-fit: cover;
            aspect-ratio: 1 / 1;

            /* display: block;
            border-radius: 5px; */
            /* margin-left: 10px; */
            /* margin: 10px; */
        }
    }
    .image-info {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        margin-top: 5px;
        background-color: #424242;
        margin-left: 10px;
        /* padding-top: 10px; */
        /* padding-bottom: 10px; */
        border-radius: 5px;
    }
    .image-info p {
        margin-left: 10px;
        color: #e3e3e3;
        font-size: 13px;
        /* background-color: red; */
    }
    .image-info button {
        /* margin-right: 10px; */
        background-color: transparent;
        border: none;
        color: white;
        /* background-color: red; */
        font-size: 13px;

        padding: 10px;
        padding-bottom: 12px;
        cursor: pointer;
    }
    .buttonSection {
        /* display: flex; */
        margin-top: 10px;
        flex-direction: row;
        gap: 5px;
    }
    .buttonSection button {
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
        font-size: 16px;
        width: 100%;
        resize: none;
        overflow-y: hidden;
        outline: none;
        border: none;
        color: #e3e3e3;
        background-color: transparent;
        /* align-content: center; */
        margin-top: 0px;
        line-height: 25px;
        overflow-y: auto;
        /* line-height: 25px; */
        /* padding: 5px; */
        /* box-sizing: border-box; */
        /* padding: 10px; */
    }
</style>
