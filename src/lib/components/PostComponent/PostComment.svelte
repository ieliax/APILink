<script>
    export let textoCompleto = '';
    export let maxCaracteres = 100;
    let mostrarCompleto = false;
  
    // Función para alternar entre mostrar el texto acortado y el texto completo
    function toggleTexto() {
      mostrarCompleto = !mostrarCompleto;
    }
  </script>
  
  <!-- Muestra el texto completo o acortado basado en mostrarCompleto -->
  
  <div class="container">
    <p>
        <span class="special-font">thecodecrumbs</span> 
        {#if mostrarCompleto}
        <span class="regular-font">{@html textoCompleto}</span>
        {:else}
        <span class="regular-font">{@html textoCompleto.slice(0, maxCaracteres)}{textoCompleto.length > maxCaracteres ? '…' : ''}</span>
          {#if textoCompleto.length > maxCaracteres}
            <span class="more" on:click={toggleTexto}>more</span>
          {/if}
        {/if}
      </p>
  </div>
  
  <!-- <p>
    {#if mostrarCompleto}
      {textoCompleto}
    {:else}
      {textoCompleto.slice(0, maxCaracteres)}{textoCompleto.length > maxCaracteres ? '…' : ''}
      {#if textoCompleto.length > maxCaracteres}
        <span class="more" on:click={toggleTexto}>more</span>
      {/if}
    {/if}
  </p> -->
  
  <style>
  
  *{
    color: black;
  }
    .container{
        margin-left: 10px;
        background-color: white;
    }

    .more {
      color: rgb(5, 5, 5);
      cursor: pointer;
      font-family: Roboto;
        font-size: 13px;
        color: #7B7B7B
        /* font-weight: bold; */
    }

    .special-font {
        font-family: Roboto;
        font-size: 14px;
        font-weight: bold;
        /* Otros estilos específicos que desees aplicar a 'thecodecrumbs' */
    }
  
    .regular-font {
        font-family: Roboto; /* Otro ejemplo con Google Font */
        font-size: 13px;
        font-weight:normal;
        white-space: pre-wrap;
        word-break: break-word; /* Asegura que las palabras se rompan adecuadamente */
        overflow-wrap: break-word; 
        /* Otros estilos para el texto regular */
    }
  </style>
  