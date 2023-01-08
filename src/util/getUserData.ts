import { db } from "@/main";
import { doc, getDoc } from "firebase/firestore";

export default async function getUserData(userId: string) {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data()
    } else {
      console.log("No such document!");
      return
    }
  }