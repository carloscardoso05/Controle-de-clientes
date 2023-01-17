<template>
  <div class="bg-white max-w-4xl pt-4 pb-12 my-4 mx-auto rounded-2xl shadow-lg">
    <h1 class="text-4xl my-4 font-bold pageName">Clientes</h1>
    <LoadingComponent v-if="loading" />

    <div class="space-y-6 mt-4" v-else>
      <div class="flex items-center mx-auto xs:px-3 place-content-between max-w-3xl">
        <AddCostumerModal />
        <SearchBar :store="useCostumersStore()" class=" xs:mx-0 mx-auto" />
      </div>
      <AllCostumers />
    </div>
  </div>
</template>

<script lang="ts" setup>
import AllCostumers from '@/components/costumers/AllCostumers.vue';
import SearchBar from '@/components/SearchBar.vue';
import AddCostumerModal from '@/components/costumers/AddCostumerModal.vue';
import { useCostumersStore } from '@/store';
import { computed } from 'vue';
import { useAppStore } from "../store/index";
import LoadingComponent from '@/components/LoadingComponent.vue';


const appStore = useAppStore()
const loading = computed(() => appStore.loading)
</script>