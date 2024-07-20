import { writable } from 'svelte/store';

export const pageInfo = writable([]);
export const gptsList = writable([]);
export const messagelist = writable([]);//{role:"assistant",content:"hola desde el asistente"},{role:"user",content:"hola"}
