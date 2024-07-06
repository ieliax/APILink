import { writable } from "svelte/store";
import { db,auth,doc,setDoc,getDoc,increment } from "$lib/firebase";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from 'firebase/auth';

export async function getDocument(){
    try {
        const docRef = doc(db,"linkcount","LZACJffVbQUEkNp3PCDN")
        const docSnap = await getDoc(docRef); 
        return docSnap.data();
    } catch (error) {
        
    }
}

export async function createUser(email,passworld){
    try {
        const userCredential = await createUserWithEmailAndPassword(auth,email,passworld)
        return userCredential.user;
    } catch (error) {
        console.log(error)
    }
}

export async function signInUser(email,passworld){
    try {
        const userCredential = await signInWithEmailAndPassword(auth,email,passworld);
        return userCredential.user;
    } catch (error) {
        console.log(error)
    }
}