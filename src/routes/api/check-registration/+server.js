import { json } from '@sveltejs/kit'; // Asegúrate de importar json

const businessA_DB = {
    "0000": {email:"moises.liriano@gmail.com", registered: true }
};
const businessB_DB = {
    "1111": {email:"elias.liriano@gmail.com", registered: true }
};

const CollectionDB = {
    "12345":businessA_DB,
    "55555":businessB_DB
}
export async function POST({request}){

    try {
      
        const { businessID,userEmail} = await request.json();

        if (!businessID || !userEmail) {
            return new Response(JSON.stringify({ error: 'Missing businessID and userID parameter' }, { status: 400 }));
        }
       
        let db = CollectionDB[businessID]

        let user = false;
        for (const userID in db) {
            if (db[userID].email === userEmail) {
                user = db[userID];
                break;
            }
        }

        if (!user) {
            return new Response(JSON.stringify({registered:false,message:'User not found'},{status:200}));
        }

        return new Response(JSON.stringify({registered:true,message:"User found"},{status:200}));

    } catch (error) {
        return new Response(JSON.stringify({ error: 'Internal Server Error' }, { status: 500 }));
    }
}