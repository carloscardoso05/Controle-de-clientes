import { deleteDoc, doc, getDoc, onSnapshot, setDoc, updateDoc, arrayRemove, increment, arrayUnion, deleteField } from "firebase/firestore"
import { onUnmounted, ref } from "vue"
import ICostumer from "./interfaces/ICostumer"
import IDebt from "./interfaces/IDebt"
import IUser from "./interfaces/IUser"
import { db, usersCollection } from "./main"


export const createUser = async (newUser: IUser) => {
    const docRef = doc(db, "users", newUser.userId)
    return await setDoc(docRef, newUser)
}

export const getUser = async (userId: string) => {
    const docRef = doc(db, "users", userId)
    const user = await getDoc(docRef)
    return user.exists() ? user.data() : null
}

export const updateUser = async (userId: string, newUser: object) => {
    const docRef = doc(db, "users", userId)
    return await updateDoc(docRef, newUser)
}

export const deleteUser = async (userId: string) => {
    const docRef = doc(db, "users", userId)
    return await deleteDoc(docRef)
}

export const useLoadUsers = () => {
    const users = ref<object>([])
    const close = onSnapshot(usersCollection, (snapshot) => {
        users.value = snapshot.docs.map((doc) => ({ userId: doc.id, ...doc.data() }))
    })
    onUnmounted(close)
    return users
}


//////////////////////////////////////////////////////////////////////////////////////////////
export const addDebt = async (userId: string, costumerName: string, newDebt: IDebt, modalId: string) => {
    if (modalId !== "") {
        (document.querySelector(modalId) as any).close()
    }
    const docRef = doc(db, "users", userId);
    const costumerDebtsRef = `costumers.${costumerName}.debts`
    const costumerTotalDebtRef = `costumers.${costumerName}.totalDebt`
    await updateDoc(docRef, {
        [costumerDebtsRef]: arrayUnion(newDebt)
    })
        .then(() => updateDoc(docRef, {
            [costumerTotalDebtRef]: increment(newDebt.price)
        }))
        .catch(e => console.log(e))
}


export const deleteDebt = async (userId: string, costumerName: string, debt: IDebt) => {
    const docRef = doc(db, "users", userId);
    const costumerDebtsRef = `costumers.${costumerName}.debts`
    const costumerTotalDebtRef = `costumers.${costumerName}.totalDebt`
    await updateDoc(docRef, {
        [costumerDebtsRef]: arrayRemove(debt)
    })
        .then(() => updateDoc(docRef, {
            [costumerTotalDebtRef]: increment(-(debt.price))
        }))
        .catch(e => console.log(e))
}

export const updateDebt = async (userId: string, costumerName: string, oldDebt: IDebt, newDebt: IDebt) => {
    const docRef = doc(db, "users", userId);
    const costumerDebtsRef = `costumers.${costumerName}.debts`
    const costumerTotalDebtRef = `costumers.${costumerName}.totalDebt`

    await updateDoc(docRef, {
        [costumerDebtsRef]: arrayRemove(oldDebt)
    })
        .then(() => updateDoc(docRef, {
            [costumerTotalDebtRef]: increment(-(oldDebt.price))
        }))
        .catch(e => console.log(e))

    await updateDoc(docRef, {
        [costumerDebtsRef]: arrayUnion(newDebt)
    })
        .then(() => updateDoc(docRef, {
            [costumerTotalDebtRef]: increment(newDebt.price)
        }))
        .catch(e => console.log(e))
}

export const addCostumer = async (userId: string, newCostumer: ICostumer, modalId: string) => {
    if (modalId !== "") {
        (document.querySelector(modalId) as any).close()
    }
    const docRef = doc(db, "users", userId);
    await updateDoc(docRef, {
        [`costumers.${newCostumer.name}`]: newCostumer
    }).catch(e => console.log(e))
}

export const deleteCostumer = async (userId: string, costumer: ICostumer) => {
    const docRef = doc(db, "users", userId);
    await updateDoc(docRef, {
        [`costumers.${costumer.name}`]: deleteField()
    }).catch(e => console.log(e))
}