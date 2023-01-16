<template>
    <fieldset class="max-w-xl w-11/12 xs:pl-8 xs:w-4/5 flex justify-between">
        <button
            class="cursor-default px-2 border rounded border-r-0 border-purple-500 bg-gray-100 rounded-r-none shrink-0 text-gray-700">
            <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
        </button>
        <input v-model="searchName" placeholder="Nome do cliente" type="text"
            class="py-2 grow pl-3 outline-none border border-purple-500 bg-gray-100 rounded rounded-l-none text-lg">
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