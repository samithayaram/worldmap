// 
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

// Firebase configuration and initialization
const firebaseConfig = {
    apiKey: "AIzaSyCHqfW2GWJVKQxQgkaqWGfU5WYmSMPrEVI",
    authDomain: "worldmap-js.firebaseapp.com",
    projectId: "worldmap-js",
    storageBucket: "worldmap-js.firebasestorage.app",
    messagingSenderId: "593260951555",
    appId: "1:593260951555:web:ad1627c9578feb86adb636"
  };


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Registration function
async function register(email, password) {
  try {
    console.log(email,password , "firebase");
    
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log(userCredential.user);
    
    // await setDoc(doc(db, "users", userCredential.user.uid), {
    //   email: userCredential.user.email,
    //   uid: userCredential.user.uid,
    //   createdAt: new Date()
    // });
    alert("User registered successfully!Please Sign in to continue....");
  } catch (error) {
    console.error("Registration error:", error);
    alert(error.message);
  }
}

// Sign-in function
async function signIn(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Sign in successful!");
    window.location.href='worldmap.html';
  } catch (error) {
    console.error("Sign-in error:", error);
    alert(error.message);
  }

}

// Event listeners for form submission
document.getElementById("signUpForm").addEventListener("submit", (e) => {
  e.preventDefault();
  let email = document.getElementById("remail").value;
  let password = document.getElementById("rpassword").value;

  console.log(email,password , "form submit");
  

  register(email,password );
});

document.getElementById("btn2").addEventListener("click", (e) => {
  e.preventDefault();
  signIn(document.getElementById("email").value, document.getElementById("password").value);
});