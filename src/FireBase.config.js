import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyCBSFQ27Z7Hw4l6I1Qsh75iVZdEVkIeIq4",
  authDomain: "fir-note-484d7.firebaseapp.com",
  projectId: "fir-note-484d7",
  storageBucket: "fir-note-484d7.firebasestorage.app",
  messagingSenderId: "275095164348",
  appId: "1:275095164348:web:71fc4b94229681758447b9",
  measurementId: "G-JJRWECT3BL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export default app;
