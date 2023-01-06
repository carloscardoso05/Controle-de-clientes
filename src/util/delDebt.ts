import { doc, updateDoc, arrayRemove, increment } from "firebase/firestore";
import { db } from "@/main";

export default async function delFunction(userId: string, costumerName: string, debt: any) {
    const docRef = doc(db, "users", userId);
    await updateDoc(docRef, {
        [`costumers.${costumerName}.debts`]: arrayRemove(debt)
    }).then(() => updateDoc(docRef, {
		[`costumers.${costumerName}.totalDebt`]: increment(-(debt.price as number))
	})).catch(e => console.log(e))
}