export async function load({ params }) {
    // params.uid contendrá el valor de 'uid' de la URL
    const uid = params.uid;

    // Aquí puedes hacer cosas como cargar datos del usuario desde una API
    // Por ejemplo:
    // const response = await fetch(`https://api.misitio.com/usuarios/${uid}`);
    // const data = await response.json();

    // Retorna los props que usarás en tu componente
    return {
      props: {
        userId: uid,
        // userData: data  // Si cargaste datos, también puedes pasarlos
      }
    };
  }