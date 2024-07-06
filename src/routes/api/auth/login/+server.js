import { json } from '@sveltejs/kit'; // Asegúrate de importar json
import { auth, db } from "../../../../lib/Firebase/config.js";
import { writeBatch, serverTimestamp } from "firebase/firestore";
import { doc } from "$lib/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export async function POST({ request }) {

    try {
        const { email, password } = await request.json()

        if ( !email || !password) {
            return new Response(JSON.stringify({ message: "Parece que faltan algunos datos como email o contracena" }, { status: 400 }))
        }

        const loginUserResponse = await signInWithEmailAndPassword(auth, email, password);
        console.log("usuario logueado")
        if (!loginUserResponse) {
            throw new Error("Failed to log in user");
        }

        let returnObjetc = { userId: loginUserResponse.user.uid, userEmail: email };
        return new Response(JSON.stringify({ userInfo: returnObjetc, message: 'Usuario logueado exitosamente' }, { status: 200 }));

    } catch (error) {
        return new Response(JSON.stringify({ error: error }, { status: 400 }));
    }

}