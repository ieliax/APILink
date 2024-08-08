<script>
    // import {handleFileChange,actualizarUrlImagenEnFirestore} from "$lib/firebaseAPI";
    // import {firebaseid,pagelogo,pagename,nickname } from "$lib/AppStore";

    let fileInput;

    //SUBSCRIBE TO STORE
    let userData;
    // appStore.subscribe(($appStore) => {
    //     userData = $appStore;
    // });

    // let uid = userData.data.props.userid;
    // let pagename = userData.data.props.profile.pagename;
    // let image = userData.data.props.profile.pagelogo;

    // async function handleFile(event) {
    //     const file = event.target.files[0];
    //     if (file) {
    //         let newURL = await handleFileChange($firebaseid, file, "logo");
    //         let response = await actualizarUrlImagenEnFirestore($firebaseid, newURL);
    //         if (response) {
    //             // image = newURL;
    //              $pagename = "asdasd"
    //             pagelogo.update(image =>{
    //                 image = newURL;
    //                 return image;
    //             });

    //             // appStore.update((data) => {
    //             //     return {
    //             //         ...data,
    //             //         profile: {
    //             //             ...data.profile,
    //             //             pagelogo: newURL, // Actualiza el logo en el perfil
    //             //         },
    //             //     };
    //             // });
    //         }
    //     }
    // }
    
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<div class="container">
    <div class="content">
        <h5>Robin | Brand Designer</h5>
        <p>brandsbyrobin</p>
    </div>

    <img
        class="logo"
        src="https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/640px-Starbucks_Corporation_Logo_2011.svg.png"
        alt="logo"
        on:click={() => fileInput.click()}
    />

    <input
        type="file"
        id="fileInput"

        accept="image/*"
        hidden
    />
</div>

<style>
    *{
        color: black;
    }
    h5 {
        margin: 0;
        font-family: Roboto;
        font-size: 26px;
        font-weight: bold;
        line-height: 1;
    }
    p {
        margin: 0;
        font-family: Roboto;
        font-size: 15px;
        font-weight: normal;
        padding-top: 4px;
    }

    .container {
        display: grid;
        grid-template-columns: 4fr 1fr;
        /* background-color: rgb(0, 255, 115);    */
        /* padding-top: 5px;
        padding-bottom: 5px; */
    }
    .content {
        /* background: wheat; */
    }
    .logo {
        cursor: pointer;
        width: 50px; /* Ajusta el tamaño según necesites */
        height: 50px; /* Asegura que la imagen sea un círculo */
        border-radius: 50%; /* Hace que los bordes de la imagen sean redondos */
        object-fit: cover; /* Asegura que la imagen cubra el área sin deformarse */
        margin: 0 auto;
    }
</style>
