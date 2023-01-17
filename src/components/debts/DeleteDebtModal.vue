<template>
    <DeleteButton :modalId="`deleteDebtModal${debt.id}`" :class="$attrs.class"/>
    <dialog :id="`deleteDebtModal${debt.id}`" class="shadow-lg rounded">
        <form method="dialog" class="space-y-6">
            <h1 class="text-lg">Deseja mesmo apagar "{{ debt.description }}"?</h1>
            <div class="space-x-20">
                <button class="border border-blue-500 bg-blue-500 text-white px-3 py-1.5 rounded" value="cancel">Cancelar</button>
                <button class="border border-red-500 hover:bg-red-300 transition-colors px-3 py-1.5 rounded" id="confirmBtn" value="default"
                    @click="deleteDebt(userId, props.costumerName, props.debt)">Apagar</button>
            </div>
        </form>
    </dialog>
</template>

<script lang="ts" setup>
import { computed, defineProps, PropType } from "vue"
import { useAppStore } from "@/store/index"
import DeleteButton from "../DeleteButton.vue";
import { deleteDebt } from "@/firebase";
import IDebt from "@/interfaces/IDebt";

const appStore = useAppStore()
const userId = computed(() => appStore.userId)

const props = defineProps({
    debt: {
        type: Object as PropType<IDebt>,
        required: true
    },
    costumerName: {
        type: String,
        required: true
    }
})
</script>

<script lang="ts">
export default {
	inheritAttrs: false
}
</script>