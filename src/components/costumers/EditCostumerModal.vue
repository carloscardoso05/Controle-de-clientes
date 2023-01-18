<template>
	<EditButton :modalId="modalId" :class="$attrs.class"/>

	<dialog :id="modalId" class="shadow-lg rounded w-full max-w-xl">
		<div>
			<form method="dialog" class="space-y-4 text-left w-fit mx-auto">
				<fieldset>
					<label>
						<p>Nome do cliente</p>
						<input :class="inputClasses" type="text" v-model="name" required="true">
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
					<button class="bg-red-500 text-white px-4 py-2 xs:px-3 xs:py-1.5 rounded" value="cancel"
						@click="$(`#${modalId}`).close()">Cancelar</button>
					<button :disabled="invalid" :class="{ 'bg-blue-300': invalid }" class="bg-blue-500 text-white px-6 py-2 xs:px-5 xs:py-1.5 rounded"
						id="confirmBtn" value="default" @click="
						updateCostumer(userId, props.costumer, newCostumer, `#${modalId}`);
						$(`#${modalId}`).close();
						formReset();
						">Salvar</button>
				</div>
			</form>
		</div>
	</dialog>
</template>

<script lang="ts" setup>
import { ref, computed, defineProps, PropType } from 'vue';
import { useAppStore } from "@/store/index"
import ICostumer from '@/interfaces/ICostumer';
import { updateCostumer } from '@/firebase';
import EditButton from '../EditButton.vue';
import capitalize from '@/util/capitalize';

const inputClasses = 'bg-gray-200 rounded-md border border-gray-300 focus:border-gray-600'

const appStore = useAppStore()
const userId = computed(() => appStore.userId)
const modalId = computed(() => `editCostumerModal${props.costumer.name.replaceAll(' ', '-')}`)

const props = defineProps({
	costumer: {
		type: Object as PropType<ICostumer>,
		required: true
	}
})

const invalid = computed(() => name.value === "")

//Formulário
const name = ref(props.costumer.name)
const phoneNumber1 = ref(props.costumer.phoneNumber1)
const phoneNumber2 = ref(props.costumer.phoneNumber2)
const email = ref(props.costumer.email)
const address = ref(props.costumer.address)

const newCostumer = computed((): ICostumer => {
	return {
		name: capitalize(name.value),
		debts: props.costumer.debts,
		totalDebt: props.costumer.totalDebt,
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

<script lang="ts">
export default {
	inheritAttrs: false
}
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