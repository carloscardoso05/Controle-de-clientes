import IUser from "@/interfaces/IUser";
import { db } from "@/main";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAppStore } from "@/store";
const appStore = useAppStore()

export default async function getUserData(userId: string) {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data()
    } else {
      const userName = appStore.userName
      await setDoc(doc(db, "users", userId), {
        costumers: {} as IUser["costumers"],
        userName: userName
      } as IUser);
      console.log("No such document!");
      return
    }
  }