<template>
  <div class="space-y-4 mt-4">
    <div class="flex items-center mx-auto place-content-between max-w-3xl">
      <AddCostumerModal />

      <SearchBar :store="useCostumersStore()" class=" xs:mx-0 mx-auto" />
    </div>
    <AllCostumers/>
  </div>
</template>

<script lang="ts" setup>
import AllCostumers from '@/components/costumers/AllCostumers.vue';
import SearchBar from '@/components/SearchBar.vue';
import AddCostumerModal from '@/components/costumers/AddCostumerModal.vue';
import { useCostumersStore } from '@/store';
</script>