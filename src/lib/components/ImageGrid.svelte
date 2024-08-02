<script>
  import { onMount, onDestroy } from 'svelte';
  import { loadMoreProducts,userid } from "../API";
  export let images = [];
  let products = [];
  let lastVisible = null;
  let loadmore = true;

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
      loadmore = false;
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
  {#if products.length != 0 && loadmore}
  <button class="load-more-button" on:click={handleLoadMore}>+</button>
  {/if}
  {#each products as image}
    <div class="image-cell">
      <img src={image.image} alt="Imagen descriptiva">
    </div>
  {/each}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  

</div>

<style>
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
    height: auto;
    color: white;
    background-color: #333;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 60px;
  }
</style>
