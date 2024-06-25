import { db, doc, getDoc, increment, setDoc } from '../../lib/firebase';
import { json } from '@sveltejs/kit'; // Asegúrate de importar json

// export async function POST({request}) {
//     try {
//         const body = await request.json()
//         const uid = body.requestBody;
//         console.log(body.requestBody.content)
//         return new Response(JSON.stringify({
//             message:"Success",
//             status:200
//         }));
//     } catch (error) {
        
//     }

// }

export async function POST({request}) {
    try {
        const body = await request.json()
        
        // const uid = body.requestBody;
        // console.log(body.requestBody)
        console.log(body)
        return new Response(JSON.stringify({
            message:"Success",
            status:200
        }));
    } catch (error) {
        
    }

}

// export async function POST({request}) {
//     try {
//         const uid  = await request.json();
        
//         if (!uid) {
//             return new Response(JSON.stringify({
//                 status: 400,
//                 body: 'Missing UID parameter'
//             }), { status: 400 });
//         }

//         const docRef = doc(db, 'linkcount', 'LZACJffVbQUEkNp3PCDN');
//         await setDoc(docRef, { count: increment(1) }, { merge: true });

    
//         const docSnap = await getDoc(docRef);
//         if (docSnap.exists()) {
//             const data = docSnap.data();
//             return json({
//                 status: 200,
//                 body: data
//             });
//         } else {
//             return json({
//                 status: 404,
//                 body: "Document not found"
//             });
//         }
//     } catch (error) {
//         console.error('Error updating document:', error);
//         return json({
//             status: 500,
//             body: "Internal Server Error"
//         });
//     }
// }


// export async function GET({url}) {
//     try {
//         const docRef = doc(db, 'linkcount', 'LZACJffVbQUEkNp3PCDN');
//         const docSnap = await getDoc(docRef);

//         const uid = url.searchParams.get('uid');

//         if (docSnap.exists()) {
//             const data = docSnap.data();
//             return new Response(JSON.stringify({
//                 status: uid,
//                 body: data
//             }));
//         } else {
//             return new Response(JSON.stringify({
//                 status:400,
//                 body:'Internal Document error'
//             }));
//         }
//     } catch (error) {
//         console.error('Error fetching document:', error);
//         return json({
//             status: 500,
//             body: "Internal Server Error"
//         });
//     }
// }


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