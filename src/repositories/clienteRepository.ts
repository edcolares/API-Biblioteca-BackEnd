import { Cliente } from "../entities/Cliente";
import { AppDataSource } from "../data-source";

export const clienteRepository = AppDataSource.getRepository(Cliente)