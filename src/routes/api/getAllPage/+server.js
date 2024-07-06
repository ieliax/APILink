import { collection,getDocs, orderBy, query, where} from "firebase/firestore";
import { db,auth,doc,setDoc,getDoc,increment } from "$lib/firebase";

// export async function POST({request}){
//     try {
//        const collectionRef = collection(db,"page");
//        const q = query(collectionRef,orderBy("timestamp"));
//        const response = await getDocs(q);
//     //    const documents = response.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//     const documents = response.docs.map(doc => ({document:doc.data()}));
//        return new Response(JSON.stringify({documents},{status:200}));
//     } catch (error) {
//         console.error(error);
//     }
// }


export async function GET() {
    try {
        const collectionRef = collection(db, "page");
        const q = query(collectionRef, orderBy("timestamp"));
        const response = await getDocs(q);
        const documents = response.docs.map(doc => ({ document: doc.data() }));

        return new Response(JSON.stringify({ documents }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}