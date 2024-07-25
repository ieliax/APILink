import { writable } from 'svelte/store';

export const pageInfo = writable([]);
export const gptsList = writable([]);
export const messagelist = writable([]);//{role:"assistant",content:"hola desde el asistente"},{role:"user",content:"hola"}

export const gptanalizer = writable(`
    {
        "model":"salesGPT",
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
        "Nombre del Producto": "Refresco de cola",
        "Informacion del Producto": "Refresca tu paladar con nuestro clásico y burbujeante Refresco de Cola, el acompañante ideal para cualquier comida.",
        "Metodo de pagos": "https://paypal.com/pago"
        },
        {
        "id": "p9q8r7s6t5u4v3w2x1y0",
        "Nombre del Producto": "Pan de Ajo",
        "Informacion del Producto": "Pan crujiente con un toque de ajo y mantequilla, perfecto para acompañar tu pizza.",
        "Metodo de pagos": "https://paypal.com/pago"
        }
        ],
        "options":["Agregar Productos Complementarios", "Continuar Sin Agregar"]
    }`);
