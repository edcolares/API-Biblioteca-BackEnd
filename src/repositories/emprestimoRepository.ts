import { AppDataSource } from '../data-source'
import { Emprestimo } from '../entities/Emprestimo'

export const emprestimoRepository = AppDataSource.getRepository(Emprestimo)
