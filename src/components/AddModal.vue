<template>
	<dialog id="modal" class="border-2 border-red-500 rounded absolute top-1/4">
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
				<input v-model="date" type="date" placeholder="Data">
			</fieldset>

			<div class="space-x-20">
				<button class="border-2 border-red-500 px-2 rounded-lg" value="cancel">Cancel</button>
				<button class="border-2 border-blue-500 px-2 rounded-lg" id="confirmBtn" value="default"
					@click="add(costumerForm, newDebt)">Confirm</button>
			</div>
		</form>
	</dialog>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import addDebt from "@/addDebt"
import { useAppStore } from "@/store/index"
import IDebt from '@/interfaces/IDebt';
import getUserData from "@/getUserData"
import IUser from '@/interfaces/IUser';

const store = useAppStore()
const userId = computed(() => store.userId)

const costumers = ref(['Carlos', 'Júlia', 'Vitor', 'Viviane'])

//Formulário
const date = ref()
const costumerForm = ref()
const descriptionForm = ref()
const priceForm = ref()


const newDebt = computed((): IDebt => {
	return {
		description: descriptionForm.value,
		price: priceForm.value,
		dateTime: date.value,
		id: Date.now().toString()
	}
})

function add(costumer: string, data: IDebt): void {
	addDebt(userId.value, costumer, data)
	getUserData(userId.value).then((data) => {
    store.userData = data as IUser
  })
}
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
}
</style>