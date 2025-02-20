import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore/lite"
import { getAuth } from "firebase/auth"
import { firebaseConfig } from "./FirebaseConfig"

const firebaseApp = initializeApp(firebaseConfig)
const auth = getAuth(firebaseApp)
const db = getFirestore(firebaseApp)

export { auth, db }
