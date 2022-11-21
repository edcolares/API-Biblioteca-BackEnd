import { AppDataSource } from '../data-source'
import { Livro } from '../entities/Livro'

export const livroRepository = AppDataSource.getRepository(Livro)
