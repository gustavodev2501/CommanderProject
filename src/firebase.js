import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCvGTXm7YRgovFOpRK0FJY7hz-QsO9dT0Y",
  authDomain: "commander-ed443.firebaseapp.com",
  projectId: "commander-ed443",
  storageBucket: "commander-ed443.firebasestorage.app",
  messagingSenderId: "443803080048",
  appId: "1:443803080048:web:534a1ca7df1bd8ec722bb5"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

export { db, auth };
