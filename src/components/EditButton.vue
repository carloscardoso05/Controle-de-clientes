<template>
    <button
        class="border-2 px-3 py-1 text-xl rounded border-blue-300 active:bg-blue-200 text-gray-700 hover:bg-blue-200"
        @click="showModal(modalId)" id="editButton">
        <font-awesome-icon icon="fa-solid fa-pen-to-square" />
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