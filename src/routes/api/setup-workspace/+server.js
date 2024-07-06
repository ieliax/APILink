import { collection, writeBatch, serverTimestamp } from "firebase/firestore";
import { db, auth, doc, setDoc, getDoc, increment } from "$lib/firebase";
import { json } from "@sveltejs/kit";

export async function POST({ request }) {
    try {
        let { userId, userName,userEmail } = await request.json();

        console.log(userId,userName,userEmail)
        if (!userId || !userEmail) {
            return new Response(JSON.stringify({ message: "Faltan datos requeridos en la solicitud" }, { status: 400 }));
        }

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
                timestamp:serverTimestamp()
            });

        // const gptsDocument = doc(db, `gpts/${uid}`);

        // batch.set(gptsDocument,
        //     {
        //         gptid: uid,
        //         gptname: gptname,
        //         gptdescription: gptdescription,
        //         gptInstructions: gptInstructions
        //     });

        await batch.commit();
        return new Response(JSON.stringify({message:"Documentos creados correctamente"},{status:200}));

    } catch (error) {
        return new Response(JSON.stringify({message:"Error al crear documentos",error:error},{status:500}))
    }
}