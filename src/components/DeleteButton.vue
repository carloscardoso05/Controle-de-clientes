<template>
    <button
        class="w-11 h-10 box-border text-xl rounded text-white bg-red-400 hover:bg-red-500 transition-colors border border-red-500"
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