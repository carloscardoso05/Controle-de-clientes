<template>
    <DeleteButton :modalId="`deleteCostumerModal${costumer.name.trim().replaceAll(' ','-')}`" :class="$attrs.class"/>
    <dialog :id="`deleteCostumerModal${costumer.name.trim().replaceAll(' ','-')}`" class="shadow-lg rounded">
        <form method="dialog" class="space-y-6">
            <h1 class="text-xl">Deseja mesmo apagar "{{ costumer.name }}"?</h1>
            <div class="space-x-20">
                <button class="border border-blue-500 bg-blue-500 text-white px-3 py-1.5 rounded" value="cancel">Cancelar</button>
                <button class="border border-red-500 hover:bg-red-300 transition-colors px-3 py-1.5 rounded" id="confirmBtn" value="default"
                    @click="deleteCostumer(userId, props.costumer)">Apagar</button>
            </div>
        </form>
    </dialog>
</template>

<script lang="ts" setup>
import { computed, defineProps, PropType } from "vue"
import { useAppStore } from "@/store/index"
import { deleteCostumer } from "@/firebase";
import ICostumer from "@/interfaces/ICostumer";
import DeleteButton from "../DeleteButton.vue";

const appStore = useAppStore()
const userId = computed(() => appStore.userId)

const props = defineProps({
    costumer: {
        type: Object as PropType<ICostumer>,
        required: true
    }
})
</script>

<script lang="ts">
export default {
	inheritAttrs: false
}
</script>