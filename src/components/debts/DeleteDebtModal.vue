<template>
    <DeleteButton :modalId="'deleteDebtModal'" :class="$attrs.class"/>
    <dialog id="deleteDebtModal" class="border-2 border-red-500 rounded absolute top-1/4">
        <form method="dialog" class="space-y-4">
            <h1>Deseja mesmo apagar?</h1>
            <div class="space-x-20">
                <button class="border-2 border-red-500 px-2 rounded-lg" value="cancel">Cancelar</button>
                <button class="border-2 border-red-500 bg-red-400 px-2 rounded-lg" id="confirmBtn" value="default"
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