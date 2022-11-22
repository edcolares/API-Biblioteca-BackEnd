import { Console } from 'console'
import { Request, Response } from 'express'
import { emprestimoRepository } from "../repositories/emprestimoRepository";
import { clienteRepository } from '../repositories/clienteRepository';
import { livroRepository } from '../repositories/livroRepository';

export class EmprestimoController {

    /**CreateEmprestimo
         * Cria novo emprestimo validando a quantia de emprestimo atuais
         * Passar no body > { 
                                * idemprestimo, 
                                * data_emprestimo, 
                                * data_retorno, 
                                * data_devolucao, 
                                * dias_atraso, 
                                * idlivro, 
                                * idcliente) 
         * }
         */
    async create(req: Request, res: Response) {
        const { data_emprestimo, data_retorno, idlivro, idcliente } = req.body
        const { idLivro, idCliente } = req.params

        try {

            const cliente = await clienteRepository.findOneBy({
                idcliente: Number(idCliente),
            })

            // !cliente ? ( return res.status(404).json({ message: 'Cliente não foi localizado.' }) )

            if (!cliente) {
                return res.status(404).json({ message: 'Cliente não foi localizado.' })
            }

            if (cliente.livros_locados > 3) {
                return res.status(404).json({ message: 'Cliente atingiu o limite máximo de livros locados' })
            }

            const livro = await livroRepository.findOneBy({
                idlivro: Number(idLivro),
            })

            if (livro?.status != "disponivel") {
                return res.status(404).json({ message: 'Livro indisponível para emprestimo.' })
            }

            const newEmprestimo = emprestimoRepository.create({ data_emprestimo, data_retorno })
			await emprestimoRepository.save(newEmprestimo)
			return res.status(201).json(newEmprestimo)

        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Internal Server Error' })
        }
    }
}