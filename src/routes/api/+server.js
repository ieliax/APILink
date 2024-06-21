import { db, doc, getDoc, increment, setDoc } from '../../lib/firebase';
import { json } from '@sveltejs/kit'; // Asegúrate de importar json

export async function POST() {
    try {
        const docRef = doc(db, 'linkcount', 'LZACJffVbQUEkNp3PCDN');
        await setDoc(docRef, { count: increment(1) }, { merge: true });

        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            return json({
                status: 200,
                body: data
            });
        } else {
            return json({
                status: 404,
                body: "Document not found"
            });
        }
    } catch (error) {
        console.error('Error updating document:', error);
        return json({
            status: 500,
            body: "Internal Server Error"
        });
    }
}

// export async function GET() {

//     try {
//         const response = await fetch('https://dummyjson.com/products')
//         const data = await response.json();

//         return new Response(JSON.stringify({
//             status: 500,
//             body: data
//         }));
//     } catch (error) {

//     }

// }

export async function GET({}) {
    try {
        const docRef = doc(db, 'linkcount', 'LZACJffVbQUEkNp3PCDN');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            return new Response(JSON.stringify({
                status: 200,
                body: data
            }));
        } else {
            return new Response(JSON.stringify({
                status:400,
                body:'Internal Document error'
            }));
        }
    } catch (error) {
        console.error('Error fetching document:', error);
        return json({
            status: 500,
            body: "Internal Server Error"
        });
    }
}


// export async function GET() {
//     try {
//         //fetch("https://dummyjson.com/posts/1");
//         const response = await getDocument();
//         return response;
//     } catch (error) {
//         new Response(JSON.stringify({
//             status: 500,
//             body: { error: error.message }
//         }));
//     }

// }