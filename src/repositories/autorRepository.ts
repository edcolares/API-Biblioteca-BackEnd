import { AppDataSource } from '../data-source'
import { Autor } from '../entities/Autor'

export const autorRepository = AppDataSource.getRepository(Autor)
