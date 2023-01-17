<template>
    <h1
        class="text-lg text-center font-medium bg-opacity-40 border mx-auto w-full py-1"
        :class="`bg-${props.color}-500 border-${props.color}-500`"
        >
        <slot class="px-1.5">
        </slot>
    </h1>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
const props = defineProps({
    color: {
        type: String,
        required: true,
        default: 'amber'
    }
})
</script>