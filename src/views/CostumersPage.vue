<template>
  <div class="space-y-4 mt-4">
    <CostumerToolBar @eventSearchName="(name) => searchName = name" addBtnMsg="Adicionar cliente" />

    <AllCostumers :searchName="searchName" />
  </div>
</template>

<script lang="ts" setup>
import AllCostumers from '@/components/costumers/AllCostumers.vue';
import CostumerToolBar from '@/components/costumers/CostumerToolBar.vue';
import { ref } from 'vue';

const searchName = ref('')
</script>