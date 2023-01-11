<template>
    <button
        class="border-2 px-3 py-1 text-xl rounded border-red-300 active:bg-red-200 text-gray-700 hover:bg-red-200"
        @click="showModal(modalId)" id="deleteButton">
        <font-awesome-icon icon="fa-solid fa-trash" class="" />
    </button>
</template>

<script lang="ts" setup>
import showModal from '@/util/showModal';
import { defineProps } from 'vue';
const props = defineProps({
    modalId: {
        type: String,
        required: true
    }
})
</script>