<template>
    <div class="flex items-center mx-auto place-content-between max-w-3xl">
        <button @click="showModal()" id="addButton"
            class="hidden xs:inline-block shrink-0 border-2 space-x-2 px-3 py-1 text-xl rounded border-purple-300 active:bg-purple-200 text-gray-700 hover:bg-purple-200">
            <p class="inline-block text-lg font-medium">
                {{ addBtnMsg }}
            </p>
            <font-awesome-icon icon="fa-solid fa-plus" class="inline-block" />
        </button>

        <button @click="showModal()" class="xs:hidden fixed bottom-3 right-3 rounded-full border-2 bg-white w-14 h-14">
            <font-awesome-icon icon="fa-solid fa-circle-plus" class="text-blue-600 h-full aspect-square" />
        </button>

        <SearchBar @eventSearchName="(name) => searchName = name" class=" xs:mx-0 mx-auto"/>
    </div>

    <AddDebtModal />
</template>

<script lang="ts" setup>
import AddDebtModal from "@/components/debts/AddDebtModal.vue";
import SearchBar from "../SearchBar.vue";
import { ref, watch, defineEmits, defineProps } from "vue"

const searchName = ref("")
const emit = defineEmits(['eventSearchName'])
const props = defineProps({
    addBtnMsg: {
        type: String,
        default: 'Adicionar'
    }
})

function showModal() {
    const modal = ref(document.querySelector('#modal')) as any
    modal.value.showModal()
}

watch([searchName], () => {
    emit('eventSearchName', searchName.value)
})
</script>