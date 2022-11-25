import { Console } from 'console'
import { Request, Response } from 'express'
import { clienteRepository } from "../repositories/clienteRepository";
import { Like } from 'typeorm'

export class ClienteController {

	/**CreateCliente
	 * Cria novo cliente
	 * Passar no body > { matricula, nome, telefone }
	 */
	async create(req: Request, res: Response) {
		const { matricula, nome, telefone } = req.body
		const livros_locados = 0

		if (!matricula) {
			return res.status(400).json({ message: 'A matricula é obrigatória' })
		}

		try {
			const newCliente = clienteRepository.create({ matricula, nome, telefone, livros_locados })

			await clienteRepository.save(newCliente)

			return res.status(201).json(newCliente)
		} catch (error) {
			console.log(error)
			return res.status(500).json({ message: 'Internal Server Error' })
		}
	}

	/**UpdateCliente
	 * Atualizar os dados do cliente 
	 * Passar por parametro idCliente e os dados para alteração
	 * no req.body   	 * */

	async update(req: Request, res: Response) {
		const { idCliente } = req.params
		try {
			const cliente = await clienteRepository.findOneBy({
				idcliente: Number(idCliente),
			})

			if (!cliente) {
				return res.status(404).json({ message: 'Cliente não foi localizado.' })
			}

			clienteRepository.merge(cliente, req.body)
			const results = await clienteRepository.save(cliente)
			return res.send(results)
		} catch (error) {
			console.log(error)
			return res.status(500).json({ message: 'Internal Server Error' })
		}
	}

	/******************************************************* 
	   LISTAR CLIENTE
		> listAll: Body deverá vir vazio
		> listBy: Body deverá conter dados de matricula e/ou nome do cliente*/
	async list(req: Request, res: Response) {

		// if ((req.body.titulo == undefined) || (req.body.status == undefined)) { /** Com erro esse código */
		if (req.body.nome == undefined) {
			console.log("Verdadeiro");

			try {
				const clientes = await clienteRepository.find({
					order: { idcliente: "ASC" },
				})

				return res.json(clientes)
			} catch (error) {
				console.log(error)
				return res.status(500).json({ message: 'Internal Sever Error' })
			}

		} else {

			const matricula = req.body.matricula
			const nome = req.body.nome

			console.log("Falso");
			console.log(nome, matricula)

			try {
				const clientes = await clienteRepository.findBy({ nome: Like("%" + nome + "%"), matricula: matricula })

				return res.json(clientes)
			} catch (error) {
				console.log(error)
				return res.status(500).json({ message: 'Internal Sever Error' })
			}
		}
	}

	async delete(req: Request, res: Response) {
		const idCli = req.params.idCliente

		try {
			const cliente = await clienteRepository.findOneBy({
				idcliente: Number(req.params.idCliente),
			})

			if(!cliente) {
				return res.status(404).json({ message: 'Cliente não foi encontrado.'})
			}

			const results = await clienteRepository.remove(cliente)
			return res.send(results)
		} catch (error) {
			console.log(error)
			return res.status(500).json({ message: 'Internal Server Error' })
		}
	}

}