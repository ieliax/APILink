import { json } from '@sveltejs/kit'; // Asegúrate de importar json

export async function POST({request}){
    try {
        const body = await request.json()
        console.log(body)
        return new Response(JSON.stringify({
            status:200,
            message:"Success"
        }));
    } catch (error) {
        
    }
}