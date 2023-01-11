<template>
    <DeleteButton :modalId="'deleteCostumerModal'" />
    <dialog id="deleteCostumerModal" class="border-2 border-red-500 rounded absolute top-1/4">
        <form method="dialog" class="space-y-4">
            <h1>Deseja mesmo apagar?</h1>
            <div class="space-x-20">
                <button class="border-2 border-red-500 px-2 rounded-lg" value="cancel">Cancelar</button>
                <button class="border-2 border-red-500 bg-red-400 px-2 rounded-lg" id="confirmBtn" value="default"
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