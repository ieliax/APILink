import { writable } from 'svelte/store';

export const pageInfo = writable([]);
export const gptsList = writable([]);
export const messagelist = writable([]);//{role:"assistant",content:"hola desde el asistente"},{role:"user",content:"hola"}

// export const gptanalizer = writable(`
//     {
//         "model":"salesGPT",
//         "action":"modelchange",
//         "userinput":""
//     }
// `);
export const gptanalizer = writable(`
    {
        "model":"CreateProductGPT",
        "action":"modelchange",
        "userinput":""
    }
`);
export const openaiList = writable(`
    {
        "id":"assistant",
        "text":"",
        "action":"crossSell",
        "items": [
        {
        "id": "wKOsiTIrQyWtk6kSk2n0",
        "productName": "Refresco de cola",
        "productDetail": "Refresca tu paladar con nuestro clásico y burbujeante Refresco de Cola, el acompañante ideal para cualquier comida.",
        "productPaymentMethod": "https://paypal.com/pago"
        }
        ],
        "options":["Agregar Productos Complementarios", "Continuar Sin Agregar"]
    }`);
