<template>
    <div class="flex items-center mx-auto place-content-between max-w-3xl">
        <button @click="showModal()" id="addButton"
            class="hidden xs:inline-block shrink-0 border-2 space-x-2 px-3 py-1 text-xl rounded border-purple-300 active:bg-purple-200 text-gray-700 hover:bg-purple-200">
            <p class="inline-block text-lg font-medium">
                Adicionar
            </p>
            <font-awesome-icon icon="fa-solid fa-plus" class="inline-block" />
        </button>

        <button @click="showModal()" class="xs:hidden fixed bottom-3 right-3 rounded-full border-2 bg-white w-14 h-14">
            <font-awesome-icon icon="fa-solid fa-circle-plus" class="text-blue-600 h-full aspect-square" />
        </button>

        <fieldset class="max-w-xl w-11/12 xs:pl-8 xs:w-4/5 flex justify-between xs:mx-0 mx-auto">
            <input v-model="searchName" placeholder="Nome do cliente" type="text"
                class="py-2 grow pl-3 outline-none border-2 border-purple-300 focus:border-purple-600 bg-gray-100 rounded rounded-r-none text-lg">
            <button
                class="px-2 border-2 rounded border-l-0 border-purple-300 active:bg-purple-200 rounded-l-none shrink-0 text-gray-700">
                <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
            </button>
        </fieldset>
    </div>

    <AddModal />
</template>

<script lang="ts" setup>
import AddModal from "@/components/AddModal.vue";
import { ref, watch, defineEmits } from "vue"

const searchName = ref("")
const emit = defineEmits(['eventSearchName'])

function showModal() {
	const modal = ref(document.querySelector('#modal')) as any
	modal.value.showModal()
}

watch([searchName], () => {
 emit('eventSearchName', searchName.value)
})
</script>