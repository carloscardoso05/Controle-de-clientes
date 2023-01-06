<template>
	<AddCostumerButton/>

	<dialog id="addCostumerModal" class="border-2 border-red-500 rounded absolute top-1/4">
		<form method="dialog" class="space-y-4">
			<fieldset>
				<label>Nome do cliente:
					<input type="text" placeholder="Nome" v-model="name" >
				</label>
			</fieldset>

			<fieldset>
				<label>Números de telefone:
					<input type="text" placeholder="Número 1" v-model="phoneNumber1">
					<input type="text" placeholder="Número 2" v-model="phoneNumber2">
				</label>
			</fieldset>

			<fieldset>
				<input type="text" placeholder="Endereço" v-model="adress" >
			</fieldset>

			<fieldset>
				<input type="text" placeholder="Último pagamento" v-model="lastPayment" >
			</fieldset>

			<fieldset>
				<input type="text" placeholder="Email" v-model="email" >
			</fieldset>

			<div class="space-x-20">
				<button class="border-2 border-red-500 px-2 rounded-lg" value="cancel">Cancelar</button>
				<button class="border-2 border-blue-500 px-2 rounded-lg" id="confirmBtn" value="default"
					@click="add(newCostumerFields)">Adicionar</button>
			</div>
		</form>
	</dialog>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useAppStore } from "@/store/index"
import IUser from '@/interfaces/IUser';
import addCostumer from "@/util/addCostumer"
import getUserData from "@/util/getUserData"
import ICostumer from '@/interfaces/ICostumer';
import AddCostumerButton from './AddCostumerButton.vue';

const store = useAppStore()
const userId = computed(() => store.userId)

//Formulário
const name = ref('')
const phoneNumber1 = ref('')
const phoneNumber2 = ref('')
const email = ref('')
const adress = ref('')
const lastPayment = ref('')

const newCostumerFields = computed((): ICostumer => {
	return {
		name: name.value,
		debts: [],
		totalDebt: 0,
		phoneNumber1: phoneNumber1.value,
		phoneNumber2: phoneNumber2.value,
		email: email.value,
		adress: adress.value,
		lastPayment: lastPayment.value,
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