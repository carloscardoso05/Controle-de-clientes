<template>
    <h1
        class="text-lg text-center font-medium bg-amber-500 bg-opacity-40 border-2 border-amber-500 mx-auto w-full py-1">
        <p class="px-1.5">
            {{ text }}
        </p>
    </h1>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
const props = defineProps({
    text: {
        type: String,
        required: true
    }
})
</script>