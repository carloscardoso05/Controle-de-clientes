<template>
    <DeleteDebtButton />
    <dialog id="deleteDebtModal" class="border-2 border-red-500 rounded absolute top-1/4">
        <form method="dialog" class="space-y-4">
            <h1>Deseja mesmo apagar?</h1>
            <div class="space-x-20">
                <button class="border-2 border-red-500 px-2 rounded-lg" value="cancel">Cancelar</button>
                <button class="border-2 border-red-500 bg-red-400 px-2 rounded-lg" id="confirmBtn" value="default"
                    @click="deleteDebt()">Apagar</button>
            </div>
        </form>
    </dialog>
</template>

<script lang="ts" setup>
import { computed, defineProps } from "vue"
import { useAppStore } from "@/store/index"
import DeleteDebtButton from "./DeleteDebtButton.vue";
import delDebt from "@/util/delDebt"
import getUserData from "@/util/getUserData";
import IUser from "@/interfaces/IUser";

const appStore = useAppStore()
const userId = computed(() => appStore.userId)

const props = defineProps({
    debt: {
        type: Object,
        required: true
    },
    costumerName: {
        type: String,
        required: true
    }
})

function deleteDebt() {
    delDebt(userId.value, props.costumerName, props.debt).then(() => {
        getUserData(userId.value).then((data) => { 	// Carrega os dados novamente
            appStore.userData = data as IUser
        })
    })
}
</script>