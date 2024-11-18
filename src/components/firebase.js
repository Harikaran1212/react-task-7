import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDDtnnPaxyWezekO9YnFMiz9EEVvO_e9C4",
  authDomain: "todolist-react-task6.firebaseapp.com",
  databaseURL: "https://todolist-react-task6-default-rtdb.firebaseio.com",
  projectId: "todolist-react-task6",
  storageBucket: "todolist-react-task6.firebasestorage.app",
  messagingSenderId: "973017563730",
  appId: "1:973017563730:web:d49d67ffc8652dfdc2558b",
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db}; 