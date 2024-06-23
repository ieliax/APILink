<script>
    
    async function notifyLinkOpened(){
        try {
            const response = await fetch('/api',{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                }
            });

            
              const data = await response.json()
             console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
    async function contactViaWhatsApp() {
        await notifyLinkOpened();
        // window.location.href = 'https://wa.me/1234567890'; // Reemplaza con tu enlace de WhatsApp
    }
     
</script>
<button on:click={contactViaWhatsApp}>Contactar por WhatsApp</button>
<p>HOLA DESDE MI PRUEBA</p>
