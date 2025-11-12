import { initializeApp} from "firebase/app";
import { firebaseConfig } from "./fireBaseConfig";
import { getAuth } from "firebase/auth/web-extension";
import { getFirestore } from "firebase/firestore";

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)