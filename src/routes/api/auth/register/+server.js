import { json } from '@sveltejs/kit'; // Asegúrate de importar json
import { auth, db } from "../../../../lib/Firebase/config.js";
import { writeBatch, serverTimestamp } from "firebase/firestore";
import { doc } from "$lib/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export async function POST({ request }) {

    try {
        const { name, email, password } = await request.json()

        if (!name || !email || !password) {
            return new Response(JSON.stringify({ message: "Parece que faltan algunos datos como email o contracena" }, { status: 400 }))
        }

        const userCreationResponse = await createUserWithEmailAndPassword(auth, email, password);
        console.log("usuario creado")
        if (!userCreationResponse) {
            throw new Error("Failed to create user");
        }

        const loginUserResponse = await signInWithEmailAndPassword(auth, email, password);
        console.log("usuario logueado")
        if (!loginUserResponse) {
            throw new Error("Failed to log in user");
        }

        const workspaceResponse = await setupWorkSpace(loginUserResponse.user.uid, name, email);
        console.log("usuario espacio de trabajo completado")
        if (!workspaceResponse) {
            throw new Error("Failed to create workspace");
        }

        let returnObjetc = { userId: loginUserResponse.user.uid, userName: name, userEmail: email };
        return new Response(JSON.stringify({ userInfo: returnObjetc, message: 'Usuario registrado exitosamente' }, { status: 200 }));

    } catch (error) {
        return new Response(JSON.stringify({ error: error }, { status: 400 }));
    }

}

async function setupWorkSpace(userId, userName, userEmail) {
    try {
        const batch = writeBatch(db);

        const userDocument = doc(db, `user/${userId}`);
        batch.set(userDocument,
            {
                userid: userId,
                useremail: userEmail
            });

        const pageDocument = doc(db, `page/${userId}`);

        batch.set(pageDocument,
            {
                pageid: userId,
                pagename: userName,
                pagedescription: "Your Business Description",
                pagelink: "Yout Website Link",
                timestamp: serverTimestamp()
            });

        await batch.commit();
        return new Response(JSON.stringify({message:"Documentos creados correctamente"},{status:200}));

    } catch (error) {

    }

}