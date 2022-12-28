import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { getAuth } from "firebase/auth";
import IUser from "@/interfaces/IUser";

export const useDespesasStore = defineStore("DespesasStore", () => {
  const userId = computed(() => getAuth().currentUser?.uid as string)
  const userData = ref({} as IUser)
  const costumersData = computed(() => userData.value["costumers"])
  const costumersNames = ref([''])

  return {
    userId,
    userData,
    costumersData,
    costumersNames
  };
});
