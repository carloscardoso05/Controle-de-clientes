import { Timestamp } from "firebase/firestore";

export default interface IDebt {
    description: string;
    price: number;
    dateTime: Timestamp|Date;
    id: number;
  }
  