<template>
	<AddDebtButton />

	<dialog id="addDebtModal" class="shadow-lg rounded w-full max-w-xl">
		<div v-if="costumers.length == 0" class="space-y-6">
			<h1 class="text-lg text-center font-medium bg-amber-500 bg-opacity-40 border-2 border-amber-500 mx-auto w-full py-1">
				<p class="px-1.5">Não há nenhum cliente adicionado ainda. Por favor, adicione um primeiro.</p>
			</h1>
			<div class="flex justify-center flex-col space-y-2 xs:flex-row xs:space-x-4 xs:space-y-0">
				<button id="cancel" class="hidden xs:block border-sky-600 border-2 rounded px-3 py-2 w-full xs:max-w-2xs font-medium" @click="($('#addDebtModal') as any).close()">Cancelar</button>
				<button id="goToCostumer" class="border-sky-600 border-2 bg-sky-600 rounded px-3 py-2 w-full xs:max-w-2xs text-white font-medium">
					<router-link :to="'/costumers'">
						Ir para Clientes
						<font-awesome-icon icon="fa-solid fa-up-right-from-square" class="ml-1"/>
					</router-link>
				</button>
				<button id="cancel" class="xs:hidden border-sky-600 border-2 rounded px-3 py-2 w-full xs:max-w-2xs font-medium" @click="($('#addDebtModal') as any).close()">Cancelar</button>
			</div>
		</div>
		<form method="dialog" v-else class="space-y-4">
			<fieldset>
				<label>Nome do cliente:
					<select v-model="costumerName" v-if="costumers.length != 0" >
						<option value="">Escolha</option>
						<option v-for="costumer in costumers" :key="costumer" :value="costumer">
							{{ costumer }}
						</option>
					</select>
				</label>
			</fieldset>

			<fieldset>
				<input v-model="price" type="number" placeholder="Valor" min="0" step="0.01">
			</fieldset>

			<fieldset>
				<input v-model="description" type="text" placeholder="Descrição">
			</fieldset>

			<fieldset>
				<input v-model="date" type="date" placeholder="Data">
			</fieldset>

			<div class="space-x-20">
				<button class="border-2 border-red-500 px-2 rounded-lg" value="cancel">Cancelar</button>
				<button class="border-2 border-blue-500 px-2 rounded-lg" id="confirmBtn" value="default"
					@click="add(costumerName, newDebt)">Adicionar</button>
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
const date = ref('')
const year = computed(() => Number(date.value.substring(0, 4)));
const month = computed(() => Number(date.value.substring(5, 7)));
const day = computed(() => Number(date.value.substring(8, 10)));
const dateTime = computed(() => new Date(year.value, month.value - 1, day.value))

const costumerName = ref('')
const description = ref('')
const price = ref(NaN)

const newDebt = computed((): IDebt => {
	return {
		description: description.value,
		price: price.value,
		dateTime: dateTime.value,
		id: dateTime.value.getTime()
	}
})

function add(costumer: string, debt: IDebt): void {
	if (costumer != '' && date.value.length == 10 && debt.description != '' && debt.price > 0) {
		addDebt(userId.value, costumer, debt).then(() => {
			getUserData(userId.value).then((data) => { 	// Carrega os dados novamente
				store.userData = data as IUser
			})
		})
	}
}

const $ = (e: string) => document.querySelector(e)
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
}

#addDebtModal::backdrop{
	background-color: rgb(0, 0, 0, 0.25);
}
</style>