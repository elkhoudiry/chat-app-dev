import { Socket } from "socket.io";

export type ActiveClient = {
  socketId: string;
  id: number;
  name: string;
  email: string;
};
