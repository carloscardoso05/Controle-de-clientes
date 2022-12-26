import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { db } from "@/main";
import { collection } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export async function getUserData(userId: string) {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return docSnap.data()
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    return
  }
}


export const useDespesasStore = defineStore("DespesasStore", () => {
  const userId = computed(() => getAuth().currentUser?.uid as string)
  const userData = computed(() => getUserData(userId.value))
  const userCollection = computed(() => collection(db, userId.value))

  return {
    userId,
    userData,
    userCollection
  };
});
