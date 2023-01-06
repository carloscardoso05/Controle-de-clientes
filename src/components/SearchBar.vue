<template>
    <fieldset class="max-w-xl w-11/12 xs:pl-8 xs:w-4/5 flex justify-between">
        <input v-model="searchName" placeholder="Nome do cliente" type="text"
            class="py-2 grow pl-3 outline-none border-2 border-purple-300 focus:border-purple-600 bg-gray-100 rounded rounded-r-none text-lg">
        <button
            class="px-2 border-2 rounded border-l-0 border-purple-300 active:bg-purple-200 rounded-l-none shrink-0 text-gray-700">
            <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
        </button>
    </fieldset>
</template>

<script lang="ts" setup>
import { ref, watch, defineProps } from "vue"

const searchName = ref("")

const props = defineProps({
    store: {
        type: Object,
        required: true
    }
})

watch([searchName], () => {
    (props.store.searchName as any) = searchName.value
})
</script>