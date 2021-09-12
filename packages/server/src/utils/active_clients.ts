import { ActiveClient } from "../models/active_client";

const activeClients: Array<ActiveClient> = [];

/** Adds a client to the current active clients list */
function addClient(socketId: string, name: string, email: string) {
  const existingClient = activeClients.find((client) => client.email === email);

  if (existingClient) return { error: "Email already exists" };

  const client = { socketId, id: 0, name, email };
  activeClients.push(client);
  return { client };
}

/** Removes a client from the current active clients list */
function removeClient(socketId: string) {
  const index = activeClients.findIndex(
    (client) => client.socketId === socketId
  );

  if (index !== -1) return activeClients.splice(index, 1)[0];
}

/** Get single client from the active clients list */
function getClient(socketId: string) {
  return activeClients.find((client) => client.socketId === socketId);
}

/** Get all clients in the active clients list */
function getAllClients() {
  return activeClients;
}

export { addClient, removeClient, getClient, getAllClients };
