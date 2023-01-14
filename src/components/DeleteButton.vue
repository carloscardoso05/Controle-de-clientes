<template>
    <button
        class="px-3 py-2 text-xl border-box rounded text-white bg-red-400 hover:bg-red-500 transition-colors border border-red-500"
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