import IDebt from "./IDebt";

export default interface ICostumer {
    debts: IDebt[];
    name: string;
    totalDebt: number;
    lastPayment?: string;
    email?: string;
    phoneNumber1?: string;
    phoneNumber2?: string;
    adress?: string;
}