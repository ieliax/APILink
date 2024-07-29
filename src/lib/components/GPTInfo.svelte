<script>
    
    import { onMount, tick } from "svelte";
    import ImageGrid from "./ImageGrid.svelte";
    export let gptname;
    export let gptlink;
    export let gptdescription;

    const imageurl = "https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/640px-Starbucks_Corporation_Logo_2011.svg.png";

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

    let images = [
    'https://scontent.fhex5-2.fna.fbcdn.net/v/t39.30808-6/453007007_909219551232943_4806353232977117812_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_ohc=qBXgEWZrvEQQ7kNvgEsNxZw&_nc_ht=scontent.fhex5-2.fna&oh=00_AYCFE1a_9DO4382zi8TZm8iICW2Zi2I2fMcPD7IJb1FCfg&oe=66ACD1F9',
    'https://scontent.fhex5-1.fna.fbcdn.net/v/t39.30808-6/453062572_909218277899737_4033827574117945959_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_ohc=IDYgGXwtJiAQ7kNvgHfTbPs&_nc_ht=scontent.fhex5-1.fna&oh=00_AYAOZCabhX1CQLZBckneC0rDh6rCxEoYraciQnvbxauiAQ&oe=66ACCED3',
    'https://scontent.fhex5-2.fna.fbcdn.net/v/t39.30808-6/453012081_908664667955098_6067738936929298697_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_ohc=KHAmiKRKS_8Q7kNvgH3P4-w&_nc_ht=scontent.fhex5-2.fna&oh=00_AYBtnn3oOOZobWIDSLE9PESEbSlffps4xgVejvu0YrLgvQ&oe=66ACD3DE',
    'https://scontent.fhex5-2.fna.fbcdn.net/v/t39.30808-6/453014907_908664654621766_2803209995352530567_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_ohc=xg-Z2WMNQvcQ7kNvgGrM1T_&_nc_ht=scontent.fhex5-2.fna&oh=00_AYC3p7dcV6KAUIXauLmau2XaOAAPp5NXZzZ6HOG6XzYBLg&oe=66ACC586',
    'https://scontent.fhex5-2.fna.fbcdn.net/v/t39.30808-6/453012081_908664667955098_6067738936929298697_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_ohc=KHAmiKRKS_8Q7kNvgH3P4-w&_nc_ht=scontent.fhex5-2.fna&oh=00_AYBtnn3oOOZobWIDSLE9PESEbSlffps4xgVejvu0YrLgvQ&oe=66ACD3DE',
    'https://scontent.fhex5-2.fna.fbcdn.net/v/t39.30808-6/453014907_908664654621766_2803209995352530567_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_ohc=xg-Z2WMNQvcQ7kNvgGrM1T_&_nc_ht=scontent.fhex5-2.fna&oh=00_AYC3p7dcV6KAUIXauLmau2XaOAAPp5NXZzZ6HOG6XzYBLg&oe=66ACC586'
    // Más URLs de imágenes
  ];
</script>
<div class="gptinfo">
    <div class="gptinfo__container">
        <img src={imageurl} alt="">
        <div class="content">
            <h1>{gptname}</h1>
            <p class="content-link">{gptlink}</p>
            <p class="content-description">{gptdescription}</p>
        </div>
        <ImageGrid images={images}/>
    </div>
</div>
<style>

    *{
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        margin: 0;
        padding: 0;
        color: white;
    }
    
    .gptinfo{
       
        /* height: 100%; */
    }

    .gptinfo__container{
        display: flex;
        flex-direction: column;
        /* width: 100%; */
    
        height: 305px;
        margin-top: 175px;
        background-color: #212121;
        align-items: center;
        gap: 11px;

    }
    .content{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
    }
    .content-description{
        font-size: 14px;
        color: white;
        text-align: center;
        margin-inline: 40px;
        letter-spacing: -.1px;
    }
    .content-link{
        font-size: 14.2px;
        color: #c9c9c9;
        letter-spacing: -.1px;
    }
    .gptinfo__container img{
        width: 50px;
        height: 50px;
        border: 1px solid #383838;
        border-radius: 50px;
    }
    .gptinfo__container h1{
        font-size: 24px;
        color: white;
        font-weight: 500;
        /* letter-spacing: -1px; */
    }
    .gptinfo__container p{
        
        /* font-weight: 500; */
    }
    @media (min-width: 768px) {
        .gptinfo__container h1{
        font-size: 24px;
        color: white;
        font-weight: 500;
        /* letter-spacing: -1px; */
    }
    .content-description{
        font-size: 14.2px;
        color: white;
        text-align: center;
        margin-inline: 100px;
        letter-spacing: -.1px;
    }
    }

</style>