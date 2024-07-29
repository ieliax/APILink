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
        "text":"¡Genial! Has elegido la Pizza Margarita Clásica, una pizza tradicional con salsa de tomate fresco, mozzarella y albahaca, horneada a la perfección, y en oferta de 2x1. Para completar tu compra, te recomiendo considerar nuestros Palitos de Mozzarella y una Ensalada César. ",
        "action":"crossSell",
        "items": [
        {
        "id": "wKOsiTIrQyWtk6kSk2n0",
        "productName": "Refresco de cola",
        "productDetail": "Refresca tu paladar con nuestro clásico y burbujeante Refresco de Cola, el acompañante ideal para cualquier comida.",
        "productPaymentMethod": "https://paypal.com/pago"
        },
        {
        "id": "p9q8r7s6t5u4v3w2x1y0",
        "productName": "Pan de Ajo",
        "productDetail": "Pan crujiente con un toque de ajo y mantequilla, perfecto para acompañar tu pizza.",
        "productPaymentMethod": "https://paypal.com/pago"
        },
        {
        "id": "p9q8r7s6t5u4v3w2x1y0",
        "productName": "Pan de Ajo",
        "productDetail": "Pan crujiente con un toque de ajo y mantequilla, perfecto para acompañar tu pizza.",
        "productPaymentMethod": "https://paypal.com/pago"
        }
        ],
        "options":["Agregar Productos Complementarios", "Continuar Sin Agregar"]
    }`);
