<template>
    <button
        class="w-11 h-10 box-border text-xl rounded text-white bg-blue-400 hover:bg-blue-500 transition-colors border border-blue-500"
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