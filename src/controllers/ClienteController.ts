import { Request, Response } from 'express'
import { clienteRepository } from "../repositories/clienteRepository";


export class ClienteController {

	async create(req: Request, res: Response) {
		const { matricula, nome, telefone } = req.body
		const livros_locado = 0

		if (!matricula) {
			return res.status(400).json({ message: 'A matricula é obrigatória' })
		}

		try {
			const newCliente = clienteRepository.create({ matricula, nome, telefone, livros_locado })

			await clienteRepository.save(newCliente)

			return res.status(201).json(newCliente)
		} catch (error) {
			console.log(error)
			return res.status(500).json({ message: 'Internal Server Error' })
		}
	}

	/**************************** ATUALIZAR LIVRO******************************/
	async update(req: Request, res: Response) {
		const { idCliente } = req.params

		const cliente = await clienteRepository.findOneBy({
			idcliente: Number(idCliente),
		})

		if (!cliente) {
			return res.status(404).json({ message: 'Cliente não foi localizado.' })
		}

		clienteRepository.merge(cliente, req.body)
		const results = await clienteRepository.save(cliente)
		return res.send(results)
	}	


}
