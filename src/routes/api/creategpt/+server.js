import { json } from '@sveltejs/kit'; // Asegúrate de importar json
import { db,addDoc,collection } from "$lib/firebase";
// import { json } from "@sveltejs/kit"

export async function POST({request}){
    
    try {
        const {name,description} = await request.json()

        if(!name || !description){
            return new Response(JSON.stringify({message:"Parece que faltan algunos datos como email o contracena"},{status:400}))
        }

        const docRef = await addDoc(collection(db,"gpts"),{
            name:name,
            description:description
        });

        return new Response(JSON.stringify({message:"exito"},{status:200}));

    } catch (error) {
        return new Response(JSON.stringify({error:error},{status:400}));
    }
   
}
