import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAwlfsAUBtYXDlAI0OEcVkA_UYw3LVFeLo",
  authDomain: "prueba1-8d9f3.firebaseapp.com",
  projectId: "prueba1-8d9f3",
  storageBucket: "prueba1-8d9f3.firebasestorage.app",
  messagingSenderId: "303067624697",
  appId: "1:303067624697:web:386f61a8bab1937a5b9e28"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;