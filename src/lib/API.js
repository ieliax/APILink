import { writable } from "svelte/store";
import { db,auth,doc,setDoc,getDoc,increment } from "$lib/firebase";

export async function getDocument(){
    const docRef = doc(db,"linkcount","LZACJffVbQUEkNp3PCDN")
    const docSnap = await getDoc(docRef); 
    return docSnap;
}