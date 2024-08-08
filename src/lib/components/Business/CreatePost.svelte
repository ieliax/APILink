<script>
    import { onMount, onDestroy, createEventDispatcher } from "svelte";
    import { browser } from "$app/environment";
    import { productList,runGridAnimation } from "../../stores/adminStore";
    import { serverTimestamp } from "firebase/firestore";
    import { uploadImage, userid, createProduct } from "../../API";
    import { v4 as uuidv4 } from "uuid";

    const dispatch = createEventDispatcher();

    export let isOpen = false;
    export let close;
    export let publish;

    let imageAspectRatio = "1 / 1"; // Valor predeterminado

    let fileInput;

    let myTextarea;
    let myTextareaAnswer;

    let imageUrl = "imageplaceholder.jpg";
    let resizedImageBlob;
    let resizedThumbImageBlob;

    console.log(uuidv4());

    onMount(() => {
        // window.addEventListener('resize', adjustTextareaHeight);
        myTextarea.value = "";
        myTextareaAnswer.value = "";
        adjustTextareaHeight();
        console.log(window.innerWidth);
        
        // fileInput.addEventListener("change", handleFileChange);
    });

    function adjustTextareaHeight() {
        // Establecer altura automáticamente basada en el contenido
        if (myTextarea) {
            
            myTextarea.style.height = "auto";
            myTextarea.style.height = `${myTextarea.scrollHeight - 10}px`;
            // console.log(window)
            
        }
        if (myTextareaAnswer) {
            
            // myTextareaAnswer.style.height = "auto";
            // myTextareaAnswer.style.height = `${myTextareaAnswer.scrollHeight - 10}px`;
            // console.log(window)
            
        }
    }

    onDestroy(() => {
        if (imageUrl) {
            URL.revokeObjectURL(imageUrl);
        }
    });

    function handleFile(event) {
        const file = event.target.files[0];
        if (!file && imageUrl != "imageplaceholder.jpg") {
            return;
        }

        imageUrl = URL.createObjectURL(file);
        const img = new Image();
        img.onload = () => {
            const aspectRatio = img.width / img.height;
            resizeImage(file, 1080,0.40, (blob, newAspectRatio) => {
                resizedImageBlob = blob;
                imageUrl = URL.createObjectURL(blob); // Actualiza la URL para visualización de la imagen principal
                imageAspectRatio = newAspectRatio; // Actualiza la relación de aspecto
            });

            resizeImage(file, 300,0.70, (blob) => {
                resizedThumbImageBlob = blob;
            });
        };
        img.onerror = () => {
            alert("No se pudo cargar la imagen.");
        };
        img.src = URL.createObjectURL(file); // Esto crea una URL que se utiliza para cargar la imagen en el objeto Image
    }

    function resizeImage(file, targetSize,quality, callback) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement("canvas");
                let sourceX, sourceY, sourceWidth, sourceHeight;
                const aspectRatio = img.width / img.height;

                let newAspectRatio;
                if (aspectRatio >= 1) {
                    // Imagen más ancha que alta o cuadrada
                    canvas.width = targetSize;
                    canvas.height = targetSize;
                    sourceHeight = img.height;
                    sourceWidth = img.height;
                    sourceX = (img.width - sourceWidth) / 2;
                    sourceY = 0;
                    newAspectRatio = "1 / 1"; // Mantén un aspect ratio cuadrado
                } else {
                    // Imagen más alta que ancha
                    canvas.width = targetSize;
                    canvas.height = targetSize * (5 / 4); // Ajusta la altura para que sea 4:5
                    sourceWidth = img.width;
                    sourceHeight = img.width * (5 / 4);
                    sourceX = 0;
                    sourceY = (img.height - sourceHeight) / 2;
                    newAspectRatio = "4 / 5"; // Ajusta a un aspect ratio de 4:5
                }

                const ctx = canvas.getContext("2d");
                ctx.drawImage(
                    img,
                    sourceX,
                    sourceY,
                    sourceWidth,
                    sourceHeight,
                    0,
                    0,
                    canvas.width,
                    canvas.height,
                );

                canvas.toBlob(
                    (blob) => {
                        callback(blob, newAspectRatio);
                    },
                    "image/jpeg",
                    quality,
                );
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    async function uploadImageToFirebase() {
        if (!resizedImageBlob) {
            console.error("No hay imagen redimensionada para subir.");
            return;
        }

        const uid = $userid;
        const filenamePrefix = "resized-image";
        const timestamp = new Date().getTime();
        onPublish(true); // Activar el loader
        try {
            const downloadURL = await uploadImage(
                uid,
                "original" + uuidv4() + timestamp,
                resizedImageBlob,
            );
            console.log("Imagen grande subida con éxito:", downloadURL);

            const minidownloadURL = await uploadImage(
                uid,
                "thumb" + uuidv4() + timestamp,
                resizedThumbImageBlob,
            );
            console.log("Imagen miniatura subida con éxito:", minidownloadURL);

            const objectProduct = {
                name: "NEW GPT",
                description: "montro",
                image: downloadURL,
                thumbs: minidownloadURL,
                aspectRatio: imageAspectRatio,
                timestamp: serverTimestamp(),
            };

            const response = await createProduct(`products/${uid}/userProducts`,objectProduct);
            
            const updatedProduct = { ...objectProduct, id: response.id };

            productList.update((currentProducts) => {
                return [updatedProduct, ...currentProducts];
            });
        } catch (error) {
            console.error("Error al subir la imagen:", error);
        }
        onPublish(false); // Desactivar el loader una vez todo ha finalizado
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
                <div class="title">
                    <p>Create Product</p>
                </div>
                <button on:click={uploadImageToFirebase}>publicar</button>
            </div>
            <div class="container">

                <div class="messagebox">
                    <div class="messagebox__container">
                       
                        <img src="https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/640px-Starbucks_Corporation_Logo_2011.svg.png" alt="" />
                        <div class="messagebox__container-message" >
                            <p>starbucks</p>
                            <textarea name="" 
                            bind:this={myTextarea} 
                            on:input={adjustTextareaHeight} 
                            placeholder="Si el usuario pregunta por ubicacion">
                        </textarea>
                        <div class="answer">
                            <img 
                            class="logo"
                            src={imageUrl}
                            alt="logo"
                            on:click={() => fileInput.click()}
                            style="aspect-ratio: {imageAspectRatio}; object-fit: cover;"
                            />
                            <!-- <i class="fa-regular fa-image"></i> -->
                            <div class="answer-footer">
                                <p>starbucks</p>
                                <!-- 서로 다른 컬러와 패턴의 아이템이 하나의 룩으로 어우러질 때의 멋은 그 무엇과도 비교하기 어렵습니다 -->
                                <textarea name="" 
                            bind:this={myTextareaAnswer} 
                            on:input={adjustTextareaHeight} 
                            placeholder="Si el usuario pregunta por ubicacion">
                        </textarea>
                            </div>
                        </div>
                        </div>
                
                    </div>
                </div>

                

            </div>
        </div>
    </div>
{/if}

<style>

    *{
        margin: 0;
    }
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
    .title{
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
    }
  
    .topbar button {
        width: 60px;
        background-color: greenyellow;
    }

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
        width: 40px;    
        height: 40px;   
        object-fit: cover;
        
    }
    

    .messagebox__container-message {
        /* line-height: 22px; */
        display: flex;
        flex-direction: column;
        /* background-color: rosybrown; */
        width: 100%;
        margin-right: 10px;
    }
    .messagebox__container-message p{
        font-family: Roboto;
        font-size: 15px;
    }
    .messagebox__container-message textarea {
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size: 15px;
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

    .answer{
        display: flex;
        flex-direction: column;
        border: 1px solid #ccc;
        width: 100%;
        /* height: 350px; */
        /* background-color: red; */
        /* border-radius: 10px; */
        border-radius: 10px;
    }

    .answer-footer{
        margin: 20px;

    }
    .answer-footer p{
        font-family: Roboto;
        font-size: 12px;
    }
    .answer-footer textarea{
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size: 15px;
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
    }

    .answer img {
        width: 100%;
        height: auto;
        display: block;
        /* border-radius: 10px; */
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        object-fit: cover;
        /* aspect-ratio: 4 / 5; */
        /* margin-left: 10px; */
        /* margin: 10px; */
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
