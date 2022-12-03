// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY || "mock_key",
  authDomain: process.env.REACT_APP_AUTH_DOMAIN || "mock_key",
  databaseURL: process.env.REACT_APP_DATABASE_URL || "mock_key",
  projectId: process.env.REACT_APP_PROJECT_ID || "mock_key",
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET || "mock_key",
  messagingSenderId: process.env.REACT_APP_MESSAGIN_ID || "mock_key",
  appId: process.env.REACT_APP_APP_ID || "mock_key",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const authService = getAuth(firebaseApp);
const dbService = getFirestore(firebaseApp);
const storageService = getStorage();

export { authService, dbService, storageService };
