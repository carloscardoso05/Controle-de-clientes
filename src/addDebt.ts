import { doc, updateDoc, arrayUnion} from "firebase/firestore";
import IDebt from "./interfaces/IDebt";
import { db } from "./main";


export default async function add(userId:string, costumer:string, updateData:IDebt){
    const docRef = doc(db, "users", userId);
	await updateDoc(docRef, {
		[`costumers.${costumer}`]: arrayUnion(updateData)
	});
}