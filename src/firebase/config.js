// ─────────────────────────────────────────────────────────────────────────
// Configuración del cliente de Firebase (Firestore).
//
// ⚠️  Esta config NO es secreta: en cualquier SPA queda igualmente incrustada en
//     el bundle del navegador. La seguridad real la dan las REGLAS de Firestore
//     (ver firestore.rules: lectura pública, escritura cerrada). Por eso este
//     archivo SÍ se versiona en Git, para que el build de CI/CD lea Firestore.
//
// 📋  Cómo obtener estos valores:
//     Consola de Firebase → ⚙️ Configuración del proyecto → "Tus apps" →
//     app web → "Configuración del SDK" → objeto firebaseConfig. Cópialo aquí.
//
// Mientras `apiKey` siga con el valor placeholder de abajo, la app NO intentará
// conectarse a Firestore y usará el catálogo estático de respaldo (fallback).
// ─────────────────────────────────────────────────────────────────────────
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyD285NSW7nBwkPBcpvceOVRKkPDP27QxGM",
  authDomain: "academy-soft.firebaseapp.com",
  projectId: "academy-soft",
  storageBucket: "academy-soft.firebasestorage.app",
  messagingSenderId: "100815795356",
  appId: "1:100815795356:web:dc1970fac8736a49b0e959",
  measurementId: "G-33ZRT3PRPZ"
};
// ID de la base de Firestore. En este proyecto la base se llama 'default' (es una
// base con NOMBRE, no la estándar '(default)'), por eso hay que indicarlo de forma
// explícita; si no, el SDK apunta a '(default)' y devuelve NOT_FOUND.
export const databaseId = 'default'

// ¿Está la config completa (no quedan placeholders)? Si no, trabajamos en modo
// fallback (catálogo estático) sin tocar Firestore.
export const isFirebaseConfigured = () =>
  !Object.values(firebaseConfig).some(
    (v) => typeof v === 'string' && v.startsWith('PEGAR_'),
  )

// Inicializamos Firestore solo si la config es válida; si no, `db` queda en null
// y catalogService cae al respaldo estático.
export const db = isFirebaseConfigured()
  ? getFirestore(initializeApp(firebaseConfig), databaseId)
  : null
