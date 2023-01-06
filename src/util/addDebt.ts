import { doc, updateDoc, arrayUnion, increment } from "firebase/firestore";
import IDebt from "../interfaces/IDebt";
import { db } from "../main";


export default async function add(userId: string, costumerName: string, debt: IDebt) {
	const docRef = doc(db, "users", userId);

	await updateDoc(docRef, {
		[`costumers.${costumerName}.debts`]: arrayUnion(debt)
	}).then(() => updateDoc(docRef, {
		[`costumers.${costumerName}.totalDebt`]: increment(debt.price)
	})).catch(e => console.log(e))
}