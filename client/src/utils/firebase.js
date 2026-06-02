import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "neuraai-466d9.firebaseapp.com",
  projectId: "neuraai-466d9",
  storageBucket: "neuraai-466d9.firebasestorage.app",
  messagingSenderId: "776412545332",
  appId: "1:776412545332:web:b457176b877e3290cc2561",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
