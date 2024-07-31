<script>
    import { onMount, onDestroy } from 'svelte';
    import { loadMoreProducts,userid } from "../API";
    export let images = [];
    let products = [];
    let lastVisible = null;

    onMount(async () => {
        const { products: initialProducts, lastVisible: newLastVisible } = await loadMoreProducts(null,$userid);
        
        products = initialProducts;
        lastVisible = newLastVisible;
        // console.log(products)
  });
  
  async function handleLoadMore() {
    const { products: newProducts, lastVisible: newLastVisible } = await loadMoreProducts(lastVisible, $userid);
    
    if (newProducts.length === 0) {
        console.log("No hay más productos para cargar.");
        // Aquí puedes, por ejemplo, deshabilitar el botón de cargar más o ajustar la UI para reflejar que no hay más datos.
        return; // Detener la ejecución para evitar agregar más productos o cambiar el cursor
    }

    products = [...products, ...newProducts];
    lastVisible = newLastVisible;
    console.log(products);
  }
    function loadMoreImages() {
      const newImages = [
        'https://scontent.fhex5-2.fna.fbcdn.net/v/t39.30808-6/449338324_801444608797820_897557397498853975_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_ohc=CG4BSPqHm4EQ7kNvgGuxP2j&_nc_ht=scontent.fhex5-2.fna&gid=AhwS2rapLspkkQ6KrhYf6fW&oh=00_AYCohsofFcJWqqUHc_XHsGj2JPynyWK5r4bGzByzawCCdA&oe=66ACBFF3',
        'https://scontent.fhex5-1.fna.fbcdn.net/v/t39.30808-6/449049660_911673814307784_5259190831744841_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_ohc=2IvfmMLgPuMQ7kNvgFO9zrs&_nc_ht=scontent.fhex5-1.fna&oh=00_AYDz_8lwb0RVdnLw_GAwcFAKIbxqC_8MeAHxHB0T6B_ERQ&oe=66ACE497',
        // Más URLs simuladas
      ];
      images = [...images, ...newImages];
    }
  
  </script>

<div class="grid">
    {#each products as image}
      <div class="image-cell">
        <img src={image.image} alt="Imagen descriptiva">
      </div>
    {/each}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
     {#if products.length != 0}
     <div class="image-cell load-more-cell" on:click={handleLoadMore}>
        <span>Cargar más</span>
      </div>
     {/if}

  </div>
  
  <style>
    .grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2px;
    }
    .image-cell {
      width: 100%;
      height: auto;
    }
    .image-cell img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .load-more-cell {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f0f0f0;  /* Color de fondo claro para que se parezca a una imagen en espera de carga */
      cursor: pointer;
    }
    .image-cell, .load-more-cell {
        height: 120px; /* Ajusta esto según el tamaño deseado */
    }

    .load-more-cell {
        background-color: #f0f0f0; /* Asegúrate de que esto concuerde con el fondo general de las cuadrículas */
        cursor: pointer;
       
    }

    @media (min-width: 768px) {
        .image-cell, .load-more-cell {
            height: 250px; /* Ajusta esto según el tamaño deseado */
        }
        .grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2px;
        }
    }
  </style>
  
