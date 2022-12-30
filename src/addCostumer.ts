import { doc, updateDoc } from "firebase/firestore";
import ICostumer from "./interfaces/ICostumer";
import { db } from "./main";


export default async function add(userId: string, updateData: ICostumer) {
	const docRef = doc(db, "users", userId);

	await updateDoc(docRef, {
		[`costumers.${updateData.name}`]: updateData
	}).catch(e => console.log(e))
}