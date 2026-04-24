import { db } from './firebase-config.js'; 
import { 
    doc, updateDoc, setDoc, collection, query, where, getDocs, getDoc 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// --- FUNCIÓN 1: AUTORIZAR COMERCIO ---
export async function autorizarComercio(idComercio) {
    try {
        const comercioRef = doc(db, "comercios", idComercio);
        await updateDoc(comercioRef, {
            estado: "activo",
            fechaAutorizacion: new Date().toISOString()
        });
        alert("¡Comercio Autorizado!");
        cargarSolicitudes(); 
    } catch (error) {
        console.error("Error al autorizar:", error);
    }
}

// --- FUNCIÓN 2: GUARDAR CONFIGURACIÓN VISUAL (LINKS) ---
export async function guardarConfiguracionVisual() {
    const logoUrl = document.getElementById('input-logo-url').value.trim();
    const fondoUrl = document.getElementById('input-fondo-url').value.trim();
    const btn = document.getElementById('btn-guardar-estetica');

    if (!logoUrl && !fondoUrl) {
        alert("Por favor, ingresa al menos un link.");
        return;
    }

    try {
        btn.disabled = true;
        btn.innerText = "Guardando...";

        const datos = {
            ultimaActualizacion: new Date().toISOString(),
            logoUrl: logoUrl,
            fondoUrl: fondoUrl
        };

        await setDoc(doc(db, "configuracion", "apariencia"), datos, { merge: true });
        alert("¡Cambios guardados!");
        cargarEsteticaActual(); 
    } catch (error) {
        console.error("Error:", error);
        alert("Error de permisos en Firestore.");
    } finally {
        btn.disabled = false;
        btn.innerText = "Actualizar Imágenes";
    }
}

// --- FUNCIÓN 3: CARGAR ESTÉTICA EN EL PANEL ---
export async function cargarEsteticaActual() {
    try {
        const docSnap = await getDoc(doc(db, "configuracion", "apariencia"));
        if (docSnap.exists()) {
            const datos = docSnap.data();
            if (datos.logoUrl) {
                document.getElementById('prev-logo').src = datos.logoUrl;
                document.getElementById('prev-logo').style.display = 'block';
                document.getElementById('input-logo-url').value = datos.logoUrl;
            }
            if (datos.fondoUrl) {
                document.getElementById('prev-fondo').src = datos.fondoUrl;
                document.getElementById('prev-fondo').style.display = 'block';
                document.getElementById('input-fondo-url').value = datos.fondoUrl;
            }
        }
    } catch (error) {
        console.error("Error al cargar:", error);
    }
}

// --- FUNCIÓN 4: CARGAR SOLICITUDES ---
export async function cargarSolicitudes() {
    const tabla = document.getElementById('tabla-pendientes');
    if (!tabla) return;
    try {
        const q = query(collection(db, "comercios"), where("estado", "==", "pendiente"));
        const querySnapshot = await getDocs(q);
        tabla.innerHTML = ""; 
        if (querySnapshot.empty) {
            tabla.innerHTML = "<tr><td colspan='4'>No hay pendientes.</td></tr>";
            return;
        }
        querySnapshot.forEach((docSnap) => {
            const d = docSnap.data();
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${d.nombreComercio}</td>
                <td>${d.email}</td>
                <td>Pendiente</td>
                <td><button onclick="autorizarComercio('${docSnap.id}')">✅</button></td>
            `;
            tabla.appendChild(fila);
        });
    } catch (e) { console.error(e); }
}