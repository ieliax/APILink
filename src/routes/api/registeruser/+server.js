import { json } from '@sveltejs/kit'; // Asegúrate de importar json
import { db,auth,doc,setDoc,getDoc,increment } from "$lib/firebase";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from 'firebase/auth';

export async function POST({request}){
    
    try {
        const {name,email,password} = await request.json()

        if(!name || !email || !password){
            return new Response(JSON.stringify({message:"Parece que faltan algunos datos como email o contracena"},{status:400}))
        }

        const userCreationResponse= await createUserWithEmailAndPassword(auth,email,password);
        if (!userCreationResponse) {
            throw new Error("Failed to create user");
        }

        const loginUserResponse = await signInWithEmailAndPassword(auth, email, password);
        if (!loginUserResponse) {
            throw new Error("Failed to log in user");
        }

        // throw redirect(307, `/businessProfile/${businessProfileId}`); 
        let returnObjetc = {userId:loginUserResponse.user.uid,userName:name,userEmail:email};
         return new Response(JSON.stringify({userInfo:returnObjetc,message:'Usuario registrado exitosamente'},{status:200}));

    } catch (error) {
        return new Response(JSON.stringify({error:error},{status:400}));
    }
   
}