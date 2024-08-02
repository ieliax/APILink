<script>
    import { onMount, onDestroy, createEventDispatcher } from "svelte";
    import { browser } from "$app/environment";
    import { productList } from "../stores/adminStore";
    import { serverTimestamp } from "firebase/firestore";
    import { uploadImage, userid, createProduct } from "../API";

    const dispatch = createEventDispatcher();

    export let isOpen = false;
    export let close;
    export let publish;

    let fileInput;

    let myTextarea;

    let imageUrl = "imageplaceholder.jpg";
    let resizedImageBlob;
    let resizedThumbImageBlob;

    console.log($userid)

    

    onMount(() => {
        // window.addEventListener('resize', adjustTextareaHeight);
        adjustTextareaHeight();
        console.log(window.innerWidth);
        // fileInput.addEventListener("change", handleFileChange);
    });

    async function handleFile(event) {
        const file = event.target.files[0];
        console.log(file);
        if (file) {
            // let newURL = await handleFileChange($firebaseid, file, "logo");
            // let response = await actualizarUrlImagenEnFirestore($firebaseid, newURL);
            // if (response) {
            //     // image = newURL;
            //      $pagename = "asdasd"
            //     pagelogo.update(image =>{
            //         image = newURL;
            //         return image;
            //     });

            // }
            if (imageUrl) {
                URL.revokeObjectURL(imageUrl);
            }

            const img = new Image();
            img.onload = () => {
                // Calcula la relación de aspecto
                const aspectRatio = img.width / img.height;
                console.log("Relación de Aspecto: ", aspectRatio); // Opcional, para depuración

                // Redimensiona para la imagen principal
                resizeImage(file, 1080, 1080, (blob) => {
                    resizedImageBlob = blob;
                    imageUrl = URL.createObjectURL(blob); // Actualiza la URL para visualización de la imagen principal
                });

                // Redimensiona para la miniatura
                resizeImage(file, 300, 300, (blob) => {
                    resizedThumbImageBlob = blob;
                    //thumbImageUrl = URL.createObjectURL(blob); // Actualiza la URL para visualización de la miniatura
                });
            };
            img.onerror = () => {
                alert("No se pudo cargar la imagen.");
            };
            img.src = URL.createObjectURL(file); // Esto crea una URL que se utiliza para cargar la imagen en el objeto Image
        }
    }

    function resizeImage(file, maxWidth, maxHeight, callback) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement("canvas");
                let width = img.width;
                let height = img.height;

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
                    (blob) => {
                        callback(blob);
                    },
                    "image/jpeg",
                    0.85,
                );
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
        onPublish(true);
        uploadImage(uid, filenamePrefix + timestamp, resizedImageBlob)
            .then((downloadURL) => {
                console.log("Imagen grande subida con éxito:", downloadURL);

                uploadImage(uid, filenamePrefix + timestamp, resizedThumbImageBlob)
                    .then((minidownloadURL) => {
                        console.log(
                            "Imagen miniatura subida con éxito:",
                            downloadURL,
                        );
                        const objectProduct = {
                            name: "NEW GPT",
                            description: "DETALLADO",
                            image: downloadURL,
                            thumbs:minidownloadURL,
                            campoOrdenar: "4",
                            timestamp: serverTimestamp(),
                        };
                        createProduct(`products/${uid}/userProducts`,objectProduct);
                        productList.update((product) =>{
                            const object ={
                            name: "NEW GPT",
                            description: "DETALLADO",
                            image: downloadURL,
                            thumbs:minidownloadURL,
                            campoOrdenar: "4",
                        };
                            product = [object,...product];
                            
                            return product
                        });
                        onPublish(false);
                    })
                    .catch((error) => {
                        console.error("Error al subir la imagen:", error);
                    });
            })
            .catch((error) => {
                console.error("Error al subir la imagen:", error);
            });
    }

    function adjustTextareaHeight() {
        // Establecer altura automáticamente basada en el contenido
        if (myTextarea) {
            myTextarea.style.height = "auto";
            myTextarea.style.height = `${myTextarea.scrollHeight - 10}px`;
            // console.log(window)
        }
    }

    function onClose(){
        dispatch("close")
    }

    function onPublish(loading){
        dispatch('publish',{showalert:loading});
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
                <button on:click={() => onClose(true)}>close</button>
                <p>Create Product</p>
                <button on:click={uploadImageToFirebase}>publicar</button>
            </div>
            <div class="container">
                <div class="content">
                    <!-- <h5>{$nickname}</h5>
                    <p>@{$pagename}</p> -->
                </div>

                <img
                    class="logo"
                    src={imageUrl}
                    alt="logo"
                    on:click={() => fileInput.click()}
                />
                <textarea
                    name=""
                    bind:this={myTextarea}
                    on:input={adjustTextareaHeight}
                    placeholder="¡Genial! Has elegido la Pizza Margarita Clásica, una pizza tradicional con salsa de tomate fresco, mozzarella y albahaca, horneada a la perfección, y en oferta de 2x1. Para completar tu compra, te recomiendo considerar nuestros Palitos de Mozzarella y una Ensalad"
                ></textarea>

                <input
                    type="file"
                    id="fileInput"
                    bind:this={fileInput}
                    on:change={handleFile}
                    accept="image/*"
                    hidden
                />
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

    .container img {
        width: 100%;
        height: auto;
        display: block;
        border-radius: 5px;
        object-fit: cover;
        aspect-ratio: 1 / 1;
        /* margin-left: 10px; */
        /* margin: 10px; */
    }
    .container textarea {
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
