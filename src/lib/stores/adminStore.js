import { writable } from 'svelte/store';

export const userAction = writable('');
export const name = writable('');
export const description = writable('');
export const instruction = writable('');


export const productList = writable([]);
export const lastVisibletest = writable(null);
export const fullSizeImagesCache = writable([]);
export const productIndex = writable()

export const runGridAnimation = writable(false);