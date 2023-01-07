import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { getAuth } from "firebase/auth";
import IUser from "@/interfaces/IUser";

export const useAppStore = defineStore("AppStore", () => {
  const userId = computed(() => getAuth().currentUser?.uid as string)
  const userData = ref({} as IUser)
  const costumersData = computed(() => userData.value["costumers"])
  const allCostumersNames = ref([''])

  return {
    userId,
    userData,
    costumersData,
    allCostumersNames
  };
});

export const useDebtsStore = defineStore("DebtsStore", () => {
  const searchName = ref('')

  return {
    searchName,
  };
});

export const useCostumersStore = defineStore("CostumersStore", () => {
  const searchName = ref('')

  return {
    searchName,
  };
});
