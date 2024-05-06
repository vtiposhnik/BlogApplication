// Import Firebase SDK
import {initializeApp} from 'firebase/app';
import { getStorage } from 'firebase/storage';
import 'firebase/auth'; 
// import serviceAccount from './blog-chebu-firebase-adminsdk-gih1v-bd4d97696f.json'

// Initialize Firebase
const firebaseConfig = {
    apiKey: import.meta.env.FIREBASE_API_KEY,
    authDomain: "blog-chebu.firebaseapp.com",
    projectId: "blog-chebu",
    storageBucket: "blog-chebu.appspot.com",
    messagingSenderId: "889702850641",
    appId: "1:889702850641:web:adf5ff7a82177a513b9870"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)

export default app
