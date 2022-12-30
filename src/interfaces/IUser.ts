import ICostumer from "./ICostumer";

export default interface IUser {
  userName: string;
  costumers: {
    [key: string]: ICostumer,
  };
}