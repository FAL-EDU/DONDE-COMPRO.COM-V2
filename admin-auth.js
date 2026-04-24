import { auth } from './firebase-config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const correosAutorizados = ["neitor38@gmail.com","leducuadrado@gmail.com"]; // PONE TU GMAIL AQUÍ

export async function verificarAccesoAdmin() {
    return new Promise((resolve) => {
        onAuthStateChanged(auth, (user) => {
            if (user && correosAutorizados.includes(user.email)) {
                resolve(true); // Usuario autenticado correctamente
            } else {
                console.warn("No detecto sesión activa de Firebase.");
                resolve(false);
            }
        });
    });
}