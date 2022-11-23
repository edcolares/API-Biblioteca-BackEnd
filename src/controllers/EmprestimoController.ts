import console, { Console, log } from 'console'
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
    async locacao(req: Request, res: Response) {
        const req_Body = req.body
        const { idLivro, idCliente } = req.params

        try {

            const cliente = await clienteRepository.findOneBy({
                idcliente: Number(idCliente),
            })

            //console.log("Valor de CLIENTE: ", cliente);

            // !cliente ? ( return res.status(404).json({ message: 'Cliente não foi localizado.' }) )

            if (!cliente) {
                return res.status(200).json({ message: 'Cliente não foi localizado.' })
            }

            if (cliente.livros_locados > 10) {
                return res.status(200).json({ message: 'Cliente atingiu o limite máximo de livros locados' })
            }

            const livro = await livroRepository.findOneBy({
                idlivro: Number(idLivro),
            })

            //console.log("Valor de LIVRO: ", livro);

            if (livro?.status == "locado") {
                return res.status(200).json({ message: 'Livro indisponível para emprestimo.' })
            }

/*             const roomUpdate = {
                ...room,
                subjects: [subject],
            } */

            const livroCliente = {
                ...req_Body,
                clientes: [{"idcliente": cliente.idcliente}],
                livros: [{"idlivro": livro?.idlivro}],
            }

            console.log("Valor de LIVROCLIENTE: ", livroCliente)

            const newEmprestimo = emprestimoRepository.create(livroCliente)
            console.log("Valor de newEmprestimo: ", newEmprestimo)
            await emprestimoRepository.save(livroCliente)

            /* livro.status = "locado"
            livroRepository.merge(livro)
            const resultsLivro = await livroRepository.save(livro)

            cliente.livros_locados++
            clienteRepository.merge(cliente)
            const resultCliente = await clienteRepository.save(cliente)

            return res.status(201).json({ resultsLivro, newEmprestimo, resultCliente })
 */

            return res.status(201).json({ message: "Livro locado com sucesso.", livro })

        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Internal Server Error' })
        }
    }



    async entrega(req: Request, res: Response) {
        const { data_devolucao } = req.body
        const { idEmprestimo } = req.params

        const emprestimo = await emprestimoRepository.findOneBy({
            idemprestimo: Number(idEmprestimo),
        })
    }

}