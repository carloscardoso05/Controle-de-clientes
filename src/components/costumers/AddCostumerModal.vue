<template>
	<dialog id="modal" class="border-2 border-red-500 rounded absolute top-1/4">
		<form method="dialog" class="space-y-4">
			<fieldset>
				<label>Nome do cliente:
					<input type="text" placeholder="Nome" v-model="nameForm" >
				</label>
			</fieldset>

			<fieldset>
				<label>Números de telefone:
					<input type="text" placeholder="Número 1" v-model="phoneNumber1Form">
					<input type="text" placeholder="Número 2" v-model="phoneNumber2Form">
				</label>
			</fieldset>

			<fieldset>
				<input type="text" placeholder="Endereço" v-model="adressForm" >
			</fieldset>

			<fieldset>
				<input type="text" placeholder="Último pagamento" v-model="lastPaymentForm" >
			</fieldset>

			<fieldset>
				<input type="text" placeholder="Email" v-model="emailForm" >
			</fieldset>

			<div class="space-x-20">
				<button class="border-2 border-red-500 px-2 rounded-lg" value="cancel">Cancel</button>
				<button class="border-2 border-blue-500 px-2 rounded-lg" id="confirmBtn" value="default"
					@click="add(newCostumerFields)">Confirm</button>
			</div>
		</form>
	</dialog>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useAppStore } from "@/store/index"
import IUser from '@/interfaces/IUser';
import addCostumer from "@/addCostumer"
import getUserData from "@/getUserData"
import ICostumer from '@/interfaces/ICostumer';

const store = useAppStore()
const userId = computed(() => store.userId)

//Formulário
const nameForm = ref('')
const phoneNumber1Form = ref('')
const phoneNumber2Form = ref('')
const emailForm = ref('')
const adressForm = ref('')
const lastPaymentForm = ref('')

const newCostumerFields = computed((): ICostumer => {
	return {
		name: nameForm.value,
		debts: [],
		totalDebt: 0,
		phoneNumber1: phoneNumber1Form.value,
		phoneNumber2: phoneNumber2Form.value,
		email: emailForm.value,
		adress: adressForm.value,
		lastPayment: lastPaymentForm.value,
	}
})

function add(data: ICostumer): void {
	if(data.name !=''){
		addCostumer(userId.value, data)
	
		getUserData(userId.value).then((data) => { 	// Carrega os dados novamente
			store.userData = data as IUser
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