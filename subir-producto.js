import { db, storage } from './firebase-config.js'; // CORRECCIÓN: Importar de tu config
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

export async function guardarProducto(nombre, precio, archivoFoto) {
    try {
        let fotoUrl = "";
        if (archivoFoto) {
            const storageRef = ref(storage, `productos/${Date.now()}_${archivoFoto.name}`);
            const snapshot = await uploadBytes(storageRef, archivoFoto);
            fotoUrl = await getDownloadURL(snapshot.ref);
        }

        await addDoc(collection(db, "productos"), {
            nombre: nombre,
            precio: parseFloat(precio),
            fotoUrl: fotoUrl,
            fechaCarga: new Date(),
            estado: "autorizado"
        });

        alert("¡Producto publicado!");
        location.reload();
    } catch (error) {
        console.error("Error al subir producto:", error);
        alert("Error al subir. Verifica que el archivo no sea muy pesado.");
    }
}