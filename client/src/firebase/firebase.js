// C:\Users\Valdemir Goncalves\Desktop\Meus Projetos\Chamado360\client\src\firebase\firebase.js

import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDApQg2-SmVZMH_QSRnV-cxkebJM9pNe6s",
  authDomain: "medium-3254d.firebaseapp.com",
  projectId: "medium-3254d",
  storageBucket: "medium-3254d.firebasestorage.app",
  messagingSenderId: "738498502815",
  appId: "1:738498502815:web:8de585a10c52d33336c2aa",
  measurementId: "G-YL1SHX0HB2"
};

const app = initializeApp(firebaseConfig);

isSupported().then((supported) => {
  if (supported) {
    getAnalytics(app);
  }
});

export const db = getFirestore(app);