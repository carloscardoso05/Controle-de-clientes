<template>
  <h1 class="text-4xl my-4 font-bold pageName">Clientes</h1>

  <LoadingComponent v-if="loading" />

  <div class="space-y-4 mt-4" v-else>
    <div class="flex items-center mx-auto xs:px-3 place-content-between max-w-3xl">
      <AddCostumerModal />

      <SearchBar :store="useCostumersStore()" class=" xs:mx-0 mx-auto" />
    </div>
    <AllCostumers />
  </div>
</template>

<script lang="ts" setup>
import AllCostumers from '@/components/costumers/AllCostumers.vue';
import SearchBar from '@/components/SearchBar.vue';
import AddCostumerModal from '@/components/costumers/AddCostumerModal.vue';
import { useCostumersStore } from '@/store';
import { ref, onMounted, computed, watch } from 'vue';
import { useAppStore } from "../store/index";
import getUserData from "@/util/getUserData"
import IUser from "@/interfaces/IUser";
import LoadingComponent from '@/components/LoadingComponent.vue';

const appStore = useAppStore()
const userId = computed(() => appStore.userId)
const loading = ref(true)


onMounted(() => {
  getUserData(userId.value)
    .then((data) => {
      appStore.userData = data as IUser
      return data as IUser
    })
    .then(() => loading.value = false)
    .catch(e => console.log(e))
})
</script>