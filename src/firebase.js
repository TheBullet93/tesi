
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyALutVzLAYDLq57yitnzjMLYPMnPnft_vw",
  authDomain: "terapisti-app.firebaseapp.com",
  databaseURL: "https://terapisti-app-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "terapisti-app",
  storageBucket: "terapisti-app.appspot.com", 
  messagingSenderId: "9352229063",
  appId: "1:9352229063:web:20bcae77a87e41f940cee2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getDatabase(app);

export const storage = getStorage(app);

export default app;
