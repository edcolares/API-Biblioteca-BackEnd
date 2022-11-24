import console from 'console'
import { Request, Response } from 'express'
import { emprestimoRepository } from "../repositories/emprestimoRepository";
import { clienteRepository } from '../repositories/clienteRepository';
import { livroRepository } from '../repositories/livroRepository';
import { Emprestimo } from '../entities/Emprestimo';
import { Livro } from '../entities/Livro';
import { Cliente } from '../entities/Cliente';


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
        const { idlivro, idcliente, data_emprestimo, data_retorno } = req.body

        try {

            const cliente = await clienteRepository.findOneBy({
                idcliente: Number(idcliente),
            })

            if (!cliente) {
                return res.status(200).json({ message: 'Cliente não foi localizado.' })
            }

            if (cliente.livros_locados > 2) {
                return res.status(200).json({ message: 'Cliente atingiu o limite máximo de livros locados', cliente })
            }

            const livro = await livroRepository.findOneBy({
                idlivro: Number(idlivro),
            })

            if (livro?.status != "disponivel") {
                return res.status(200).json({ message: 'Livro indisponível para emprestimo.', livro })
            }

            const newLivro = new Livro()
            newLivro.idlivro = Number(idlivro)
            newLivro.status = "locado"
            livroRepository.save(newLivro)
            
            const newCliente = new Cliente()
            newCliente.idcliente = Number(idcliente)

            const emprestimo = new Emprestimo()
            emprestimo.data_emprestimo = data_emprestimo
            emprestimo.data_retorno = data_retorno
            emprestimo.livro = newLivro
            emprestimo.cliente = newCliente

            const newEmprestimo = emprestimoRepository.create(emprestimo)
            await emprestimoRepository.save(newEmprestimo)

            cliente.livros_locados++
            clienteRepository.merge(cliente)
            const resultCliente = await clienteRepository.save(cliente)

            return res.status(201).json({ message: "Livro locado com sucesso.", livro })

        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Internal Server Error' })
        }
    }

    /** registro de devolução e ajustes os controles:
     * livro.status dever alterar seu status para "disponivel"
     * cliente.livros_locados vai reduzir um unidade,
     * Haverá o controle de a entrega foi realizada em atraso e registro no campo dias_atraso
     */
    async devolucao(req: Request, res: Response) {

        const { data_devolucao } = req.body
        const { idEmprestimo } = req.params

        try {
            const findEmprestimo = await emprestimoRepository.findOneBy({
                idemprestimo: Number(idEmprestimo),
            })
            if (!findEmprestimo) {
                return res.status(404).json({ message: "Não conseguimos localizar o emprestimo, verifique as informações." })
            }
            if (findEmprestimo?.data_devolucao != null) {
                return res.status(201).json({ message: "Emprestimo já foi prpcessado anteriormente, verifique com o bibliotecário.", findEmprestimo })
            }

            let dtDevolucao: string = data_devolucao;
            let dtRetorno: string = String(findEmprestimo!.data_retorno)

            const dataDev: Date = new Date(dtDevolucao)
            const dataEmp: Date = new Date(dtRetorno)
            let atrasoInMilisec: number = dataDev.getTime() - dataEmp.getTime()
            let diasAtraso: number = Math.ceil(atrasoInMilisec / (1000 * 60 * 60 * 24))

            const findCliente = await clienteRepository.findOneBy({
                idcliente: findEmprestimo?.cliente.idcliente
            })

            findCliente!.livros_locados--
            clienteRepository.merge(findCliente!)
            const resultCliente = await clienteRepository.save(findCliente!)

            findEmprestimo!.dias_atraso = diasAtraso
            findEmprestimo!.data_devolucao = data_devolucao
            emprestimoRepository.merge(findEmprestimo!)
            const resultEmprestimo = await emprestimoRepository.save(findEmprestimo!)

            const updLivro = new Livro()
            updLivro.status = "disponivel"
            updLivro.idlivro = findEmprestimo!.livro.idlivro
            const resultLivro = await livroRepository.save(updLivro)

            return res.status(201).json({ message: "Livro devolvido com sucesso!", resultEmprestimo })

        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Internal Server Error' })
        }
    }
}