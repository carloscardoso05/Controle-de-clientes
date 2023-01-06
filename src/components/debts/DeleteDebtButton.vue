<template>
    <button
        class="shrink-0 border-2 space-x-2 px-3 py-1 text-xl rounded border-red-300 active:bg-red-200 text-gray-700 hover:bg-red-200"
        @click="showModal(modalId)" id="deleteButton">
        <font-awesome-icon icon="fa-solid fa-trash" class="" />
    </button>
</template>

<script lang="ts" setup>
import showModal from '@/util/showModal';
const modalId = 'deleteDebtModal'
</script>