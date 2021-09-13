import { Socket } from "socket.io";

export type ActiveClient = {
  socketId: string;
  id: number;
  to: string;
  name: string;
  email: string;
};
