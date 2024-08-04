import { writable,get  } from "svelte/store";
import { db, auth,storage } from "$lib/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { serverTimestamp,doc, setDoc, addDoc, getDoc, getDocs, collection, query, orderBy,where,startAfter,limit } from "firebase/firestore";
import { uploadBytes,getDownloadURL,ref} from "firebase/storage";
import { description } from "./stores/adminStore";


export const userid = writable('');


export async function loadMoreProducts(lastVisible, userID) {
    const productsRef = collection(db, "products/"+userID+"/userProducts");
    // console.log(productsRef)
    let queryRef;

    // Establece el límite de documentos a recuperar en cada solicitud
    const LIMIT = 6;

    if (lastVisible) {
      // Si hay un documento visible de la última carga, empieza después de ese documento
      queryRef = query(productsRef, orderBy("timestamp","desc"), startAfter(lastVisible), limit(LIMIT));
    } else {
      // Si no hay un documento visible (primera carga), simplemente aplica el límite
      queryRef = query(productsRef, orderBy("timestamp","desc"), limit(LIMIT));
    }

    try {
      const documentSnapshots = await getDocs(queryRef);

      // Si no hay documentos, has llegado al final de la colección
      if (documentSnapshots.empty) {
        console.log("No more documents available.");
        return { products: [], lastVisible: null };
      }

      const lastVisibleDocument = documentSnapshots.docs[documentSnapshots.docs.length - 1];
      const products = documentSnapshots.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // Devuelve los productos y el último documento visible si aún hay documentos
      return { products, lastVisible: lastVisibleDocument };
    } catch (error) {
      console.error("Error cargando más productos: ", error);
      return { products: [], lastVisible: null };
    }
  }

  

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



//UPLOAD PRODUCT
export async function uploadImage(uid, filenamePrefix, file) {
    const filename = `${filenamePrefix}.${file.type.split('/')[1]}`; // Define la extensión basada en el tipo MIME del archivo
    const fileRef = ref(storage, `users/${uid}/${filename}`);

    try {
        // Sube el archivo a Firebase Storage usando await
        const snapshot = await uploadBytes(fileRef, file);
        console.log('Imagen subida con éxito');

        const downloadURL = await getDownloadURL(fileRef);
        console.log('URL de descarga:', downloadURL);

        // Aquí podrías actualizar información en Firestore si es necesario
        return downloadURL; // Retorna la URL de descarga del archivo
    } catch (error) {
        console.error('Error al subir la imagen:', error);
        throw error; // Lanza el error para manejo externo si es necesario
    }
}

//CREATE PRODUCT
export const createProduct = async (collectionURL,objectProduct) => {
    // Define la referencia de la colección donde se agregará el nuevo documento
    const documentid = doc(collection(db, collectionURL)).id;
    const docRef = doc(db, collectionURL, documentid);

    try {
      // Agrega el documento a la colección. Firestore genera automáticamente el ID del documento.
      await setDoc(docRef, objectProduct);
        // promotionPosts.update(currentPosts => {
        //     return [...currentPosts, object]; 
        // });

      return { success: true, id: docRef.id }; // Retorna true y el ID del nuevo documento si la operación fue exitosa
    } catch (error) {
      console.error("Error al agregar el documento:", error);
      return { success: false, error: error }; // Retorna false y el error si hubo un error
    }
  };




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