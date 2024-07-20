import { writable } from "svelte/store";
import { db, auth,storage } from "$lib/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { serverTimestamp,doc, setDoc, addDoc, getDoc, getDocs, collection, query, orderBy,where } from "firebase/firestore";
import { uploadBytes,getDownloadURL,ref} from "firebase/storage";
import { description } from "./stores/adminStore";




export function getCookieInfo(name) {
    let cookieArr = document.cookie.split(";");
    for (let i = 0; i < cookieArr.length; i++) {
        let cookiePair = cookieArr[i].split("=");
        if (name == cookiePair[0].trim()) {
            // Decodifica el valor de la cookie y retorna
            return decodeURIComponent(cookiePair[1]);
        }
    }
    // Retorna nulo si no se encuentra la cookie
    return null;
}

export async function getBusinessPageByName(pagename){
    try {
        const pageRef = collection(db,"page");
        const q = query(pageRef,where("pagename","==",pagename))
        const snap = await getDocs(q)
        // console.log(snap.data)
        const pages =  snap.docs.map(doc => ({ document: doc.data() }));
        return pages;
    } catch (error) {
        console.log(error)
    }
}


export async function getBusinessGPTByName(uid,pagename){
    try {
        const pageRef = collection(db,"gpts/"+uid+"/userGPTS");
        const q = query(pageRef,where("gptname","==",pagename))
        const snap = await getDocs(q)
        // console.log(snap.data)
        const pages =  snap.docs.map(doc => ({ document: doc.data() }));
        return pages;
    } catch (error) {
        console.log(error)
    }
}

export const getAllDocumentsFromCollection = async(db_collection) => {
    const collectionRef = collection(db,db_collection)
   
    const snapshot =  await getDocs(collectionRef);
    const documentos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return documentos; //
}

export async function collectionByName(collectionName) {
    try {
        
        const collectionRef = collection(db, collectionName);
        const q = query(collectionRef, orderBy("timestamp"));
        const response = await getDocs(q);
        const documents = response.docs.map(doc => ({ document: doc.data() }));

        return documents;

    } catch (error) {

        return error;
    }
}

export const createGPTInfo = async (user_uid) => {
    // Define la referencia de la colección donde se agregará el nuevo documento
    const documentid = doc(collection(db, `gpts/${user_uid}/userGPTS`)).id;
    const docRef = doc(db, `gpts/${user_uid}/userGPTS`, documentid);
    
    const object = {
        name:"NEW GPT",
        description:"DETALLADO",
        timestamp:serverTimestamp()
    }
  
    try {
      // Agrega el documento a la colección. Firestore genera automáticamente el ID del documento.
      await setDoc(docRef, object);
        // promotionPosts.update(currentPosts => {
        //     return [...currentPosts, object]; 
        // });

      return { success: true, id: docRef.id }; // Retorna true y el ID del nuevo documento si la operación fue exitosa
    } catch (error) {
      console.error("Error al agregar el documento:", error);
      return { success: false, error: error }; // Retorna false y el error si hubo un error
    }
  };

export async function uploadBaseknowled(uid, filenamePrefix, contentString) {
    const filename = `${filenamePrefix}.txt`;
    const contentBlob = new Blob([contentString], { type: 'text/plain;charset=utf-8' });

    // Crea una referencia a donde quieres guardar el archivo en Firebase Storage
    const fileRef = ref(storage, `users/${uid}/${filename}`);

    try {
        // Sube el Blob a Firebase Storage usando await
        const snapshot = await uploadBytes(fileRef, contentBlob);
        console.log('Archivo subido con éxito');

        const downloadURL = await getDownloadURL(fileRef);
        console.log('URL de descarga:', downloadURL);

        // await actualizarBaseknowledEnFirestore(uid, downloadURL, filenamePrefix);
        return downloadURL; // Opcionalmente, retorna algo relevante de snapshot si es necesario
    } catch (error) {
        console.error('Error al subir el archivo:', error);
        throw error; // Lanza el error para manejo externo si es necesario
    }

}

export async function actualizarBaseknowledEnFirestore(uid, knowledUrl, filenamePrefix) {
    const docRef = doc(db, `gpts/${uid}`, uid);
    try {
        if (filenamePrefix == "baseknowled1") {
            await updateDoc(docRef, {
                baseknowled: knowledUrl
            });
        } else if (filenamePrefix == "promoknowled") {
            await updateDoc(docRef, {
                promoknowled: knowledUrl
            });
        }

        console.log("baseknowled actualizado con éxito");
        return true

    } catch (error) {
        console.error("Error al actualizar el baseknowled:", error);
        return false

    }
}

export async function getDocument() {
    try {
        const docRef = doc(db, "linkcount", "LZACJffVbQUEkNp3PCDN")
        const docSnap = await getDoc(docRef);
        return docSnap.data();
    } catch (error) {

    }
}

export async function createUser(email, passworld) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, passworld)
        return userCredential.user;
    } catch (error) {
        console.log(error)
    }
}

export async function signInUser(email, passworld) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, passworld);
        return userCredential.user;
    } catch (error) {
        console.log(error)
    }
}