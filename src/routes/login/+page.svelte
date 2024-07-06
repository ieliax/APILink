<script>
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { getDocument, createUser, signInUser } from "../../lib/API";

    // onMount(async () => {
    //     try {
    //         let response = await createUser(
    //             "elias.liriano@gmail.com",
    //             "tolete22",
    //         );

    //         if (response) {
    //             console.log("Estás logueado");
    //             goto("/"); // Redirige al usuario a la página de inicio
    //         } else {
    //             console.log("No se pudo iniciar sesión");
    //         }
    //     } catch (error) {
    //         console.error("Error al iniciar sesión:", error);
    //     }
    // });

    let email = '';
    let password = '';
    let error = '';

    async function registerUser(){
        
        try {
             let response = await createUser(email,password)
             if(response){
                goto("/");
                console.log("usuario registrado exitosamente")
             }else{
                console.log("falla en registro")
             }
        } catch (error) {
            console.error("Error al iniciar session:",error)
        }
    }

    async function test(){
        try {
            const response = await fetch("/api/registeruser",{
                method:"POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email:email,password:password})
            })

            const data = await response.json();
            console.log(data);
        } catch (error) {
            
        }
    }

 

</script>

<div id="container">
    <section id="content">
        <label for="email">UserEmail</label>
        <input type="text" bind:value={email} name="email" />
        <label for="Password">Password</label>
        <input type="text" bind:value={password} name="Password" />
        <button on:click={test}>Login</button>
    </section>
</div>

<style>
    #container {
        display: flex;
        width: 20%;
        padding: 20px;
        border: 1px solid #ccc;
        /* background-color: rebeccapurple; */
        margin: 0 auto;
        justify-content: center;
    }

    #container #content {
        display: flex;
        flex-direction: column;
        /* border: 2px solid red; */
    }
</style>
