import ICostumer from "./ICostumer";

export default interface IUser {
  userId: string
  userName: string;
  costumers: {
    [key: string]: ICostumer,
  };
}