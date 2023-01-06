<template>
	<AddDebtButton />

	<dialog id="addDebtModal" class="border-2 border-red-500 rounded absolute top-1/4">
		<form method="dialog" class="space-y-4">
			<fieldset>
				<label>Nome do cliente:
					<select v-model="costumerForm">
						<option value="default">Escolha</option>
						<option v-for="costumer in costumers" :key="costumer" :value="costumer">
							{{ costumer }}
						</option>
					</select>
				</label>
			</fieldset>

			<fieldset>
				<input v-model="priceForm" type="number" placeholder="Valor" min="0" step="0.01">
			</fieldset>

			<fieldset>
				<input v-model="descriptionForm" type="text" placeholder="Descrição">
			</fieldset>

			<fieldset>
				<input v-model="dateForm" type="date" placeholder="Data">
			</fieldset>

			<div class="space-x-20">
				<button class="border-2 border-red-500 px-2 rounded-lg" value="cancel">Cancelar</button>
				<button class="border-2 border-blue-500 px-2 rounded-lg" id="confirmBtn" value="default"
					@click="add(costumerForm, newDebt)">Adicionar</button>
			</div>
		</form>
	</dialog>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useAppStore } from "@/store/index"
import IUser from '@/interfaces/IUser';
import IDebt from '@/interfaces/IDebt';
import addDebt from "@/util/addDebt"
import getUserData from "@/util/getUserData"
import AddDebtButton from "./AddDebtButton.vue";

const store = useAppStore()
const userId = computed(() => store.userId)
const costumers = computed(() => store.allCostumersNames)

//Formulário
const dateForm = ref('')
const year = computed(() => Number(dateForm.value.substring(0, 4)));
const month = computed(() => Number(dateForm.value.substring(5, 7)));
const day = computed(() => Number(dateForm.value.substring(8, 10)));
const dateTime = computed(() => new Date(year.value, month.value - 1, day.value))

const costumerForm = ref('')
const descriptionForm = ref('')
const priceForm = ref(NaN)

const newDebt = computed((): IDebt => {
	return {
		description: descriptionForm.value,
		price: priceForm.value,
		dateTime: dateTime.value,
		id: dateTime.value.getTime()
	}
})

function add(costumer: string, data: IDebt): void {
	if (costumer != '' && dateForm.value.length == 10 && data.description != '' && data.price > 0) {
		addDebt(userId.value, costumer, data).then(() => {
			getUserData(userId.value).then((data) => { 	// Carrega os dados novamente
				store.userData = data as IUser
			})
		})
	}
}
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
}
</style>