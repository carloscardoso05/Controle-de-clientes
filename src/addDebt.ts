import { doc, updateDoc, arrayUnion, increment } from "firebase/firestore";
import IDebt from "./interfaces/IDebt";
import { db } from "./main";


export default async function add(userId: string, costumerName: string, updateData: IDebt) {
	const docRef = doc(db, "users", userId);

	await updateDoc(docRef, {
		[`costumers.${costumerName}.debts`]: arrayUnion(updateData)
	}).then(() => updateDoc(docRef, {
		[`costumers.${costumerName}.totalDebt`]: increment(updateData.price)
	})).catch(e => console.log(e))
}