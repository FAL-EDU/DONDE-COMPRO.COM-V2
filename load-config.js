import { db } from './firebase-config.js'; // Sin la palabra backend
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

async function aplicarConfiguracionVisual() {
    try {
        const docRef = doc(db, "configuracion", "apariencia");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const config = docSnap.data();
            if (config.logoUrl) document.getElementById('logo-sitio').src = config.logoUrl;
            if (config.fondoUrl) {
                const fondo = document.getElementById('fondo-agua');
                if(fondo) {
                    fondo.style.backgroundImage = `url('${config.fondoUrl}')`;
                    fondo.style.backgroundSize = "cover";
                }
            }
        }
    } catch (error) {
        console.error("Error visual:", error);
    }
}
document.addEventListener('DOMContentLoaded', aplicarConfiguracionVisual);