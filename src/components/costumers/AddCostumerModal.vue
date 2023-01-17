<template>
	<AddCostumerButton />

	<dialog id="addCostumerModal" class="shadow-lg rounded w-full max-w-xl">
		<div class="max-w-xs w-fit mx-auto py-2">
			<form method="dialog" class="space-y-4 text-left">
				<fieldset>
					<label>
						<p>Nome do cliente</p>
						<input :class="inputClasses" type="text" v-model="name" required>
					</label>
				</fieldset>
				<fieldset>
					<label for="">
						<p>Endereço</p>
						<input :class="inputClasses" type="text" v-model="address">
					</label>
				</fieldset>
				<fieldset>
					<label for="">
						<p>Email</p>
						<input :class="inputClasses" type="text" v-model="email">
					</label>
				</fieldset>
				<fieldset>
					<label class="space-y-1.5">
						<p>Números de telefone</p>
						<input :class="inputClasses" type="text" v-model="phoneNumber1" placeholder="Número 1"> <br>
						<input :class="inputClasses" type="text" v-model="phoneNumber2" placeholder="Número 2">
					</label>
				</fieldset>

				<div class="space-x-16 pt-6">
					<button class="border-2 border-red-500 px-4 py-2 xs:px-3 xs:py-1.5 rounded" value="cancel"
						@click="$('#addCostumerModal').close()">Cancelar</button>
					<button class="border-2 border-blue-500 bg-blue-500 text-white px-4 py-2 xs:px-3 xs:py-1.5 rounded"
						id="confirmBtn" value="default"
						@click="
						addCostumer(userId, newCostumer);
						$('#addCostumerModal').close();
						formReset();
						">Adicionar</button>
				</div>
			</form>
		</div>
	</dialog>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useAppStore } from "@/store/index"
import ICostumer from '@/interfaces/ICostumer';
import AddCostumerButton from './AddCostumerButton.vue';
import { addCostumer } from '@/firebase';

const inputClasses = 'bg-gray-200 rounded-md border-2 border-gray-300 focus:border-gray-600'

const appStore = useAppStore()
const userId = computed(() => appStore.userId)

//Formulário
const name = ref('')
const phoneNumber1 = ref('')
const phoneNumber2 = ref('')
const email = ref('')
const address = ref('')

const newCostumer = computed((): ICostumer => {
	return {
		name: name.value,
		debts: [],
		totalDebt: 0,
		phoneNumber1: phoneNumber1.value,
		phoneNumber2: phoneNumber2.value,
		email: email.value,
		address: address.value
	}
})

function formReset() {
	name.value = ''
	address.value = ''
	email.value = ''
	phoneNumber1.value = ''
	phoneNumber2.value = ''
}

const $ = (e: string): any => document.querySelector(e)
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
}

input,
select {
	width: 100%;
	outline: none;
}
</style>