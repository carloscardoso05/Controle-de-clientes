import { defineStore } from "pinia";
import { computed, ref } from "vue";
import IUser from "@/interfaces/IUser";

export const useAppStore = defineStore("AppStore", () => {
  const userId = ref('')
  const userData = ref({} as IUser)
  const userName = ref('')
  const loading = ref(true)

  const costumersData = computed(() => userData.value["costumers"] as IUser["costumers"])
  const allCostumersNames = computed(() => Object.keys(costumersData.value))

  return {
    userId,
    userData,
    costumersData,
    allCostumersNames,
    userName,
    loading
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