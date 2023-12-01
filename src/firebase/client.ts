import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAWUJkabsoGi0eeNAEd7ZEXwZZwiLbYFVk",
  authDomain: "cibt-student-portal.firebaseapp.com",
  projectId: "cibt-student-portal",
  storageBucket: "cibt-student-portal.appspot.com",
  messagingSenderId: "389342507814",
  appId: "1:389342507814:web:39ef8c2ce8890974f387e7",
  measurementId: "G-KQJQRNX7XR"
};

export const app = initializeApp(firebaseConfig);
