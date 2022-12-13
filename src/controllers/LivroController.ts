import { Console } from 'console'
import { Request, Response } from 'express'
import { Like } from 'typeorm'
import { autorRepository } from '../repositories/autorRepository'
import { livroRepository } from '../repositories/livroRepository'

export class LivroController {

	async create(req: Request, res: Response) {

		console.log("Valor de Request", req)

		const { isbn, titulo, editora, ano_publicacao, status } = req.body

		try {
			const newLivro = livroRepository.create({ isbn, titulo, editora, ano_publicacao, status })
			await livroRepository.save(newLivro)

			return res.status(201).json(newLivro)
		} catch (error) {
			console.log(error)
			return res.status(500).json({ message: 'Internal Sever Error' })
		}
	}

	/**************************** CRIAR AUTOR ***********************************/
	async createAutor(req: Request, res: Response) {
		const { nome, pais_origem } = req.body
		const { idLivro } = req.params

		try {
			const livro = await livroRepository.findOneBy({ idlivro: Number(idLivro) })

			if (!livro) {
				return res.status(404).json({ message: 'Livro não existe.' })
			}

			const newAutor = autorRepository.create({
				nome,
				pais_origem,
				livro,
			})

			await autorRepository.save(newAutor)

			return res.status(201).json(newAutor)
		} catch (error) {
			console.log(error)
			return res.status(500).json({ message: 'Internal Sever Error' })
		}
	}

	/** teste */

	/*	
		async roomSubject(req: Request, res: Response) {
			const { subject_id } = req.body
			const { idRoom } = req.params
	
			try {
				const room = await livroRepository.findOneBy({ id: Number(idRoom) })
	
				if (!room) {
					return res.status(404).json({ message: 'Aula não existe' })
				}
	
				const subject = await subjectRepository.findOneBy({
					id: Number(subject_id),
				})
	
				if (!subject) {
					return res.status(404).json({ message: 'Disciplina não existe' })
				}
	
				const roomUpdate = {
					...room,
					subjects: [subject],
				}
	
				await livroRepository.save(roomUpdate)
	
				return res.status(204).send()
			} catch (error) {
				console.log(error)
				return res.status(500).json({ message: 'Internal Sever Error' })
			}
		}
	*/

	/****************************** LISTAR TUDO *********************************/
	async list(req: Request, res: Response) {

		// if ((req.body.titulo == undefined) || (req.body.status == undefined)) { /** Com erro esse código */
				
		if (req.body.titulo == undefined) {
			console.log("Verdadeiro");

			try {
				const livros = await livroRepository.find({
					order: { idlivro: "ASC" },
					relations: {
						//subjects: true,
						autores: true,
					},
				})

				return res.json(livros)
			} catch (error) {
				console.log(error)
				return res.status(500).json({ message: 'Internal Sever Error' })
			}
		} else {

			const status = req.body.status
			const titulo = req.body.titulo

			console.log("Falso");
			console.log(status, titulo)

			try {
				const livros = await livroRepository.findBy({ titulo: Like("%" + titulo + "%"), status: status })

				return res.json(livros)
			} catch (error) {
				console.log(error)
				return res.status(500).json({ message: 'Internal Sever Error' })
			}

		}
	}

	/************** BUSCA POR NOME DO AUTOR *************************/
	async listAutor(req: Request, res: Response) {
		const { nome } = req.body
		
		if (!nome) {
			return res.send("Digite nome do autor")
		} else {
			try {
				const autores = await autorRepository.find({
					where: {
						nome: Like("%" + nome + "%")
					},
					relations: {
						livro: true,
					}
				})

				return res.json(autores)
			} catch (error) {
				console.log(error)
				return res.status(500).json({ message: 'Internal Sever Error' })
			}
		}
	}

	/**************************** BUSCAR POR ID **************************/
	async buscarPorId(req: Request, res: Response) {
		const { idLivro } = req.params
		try {
			const livro = await livroRepository.findOneBy({ idlivro: Number(idLivro) })
			if (!livro) {
				return res.status(404).json({ message: 'Livro não foi encontrado.' })
			}
			res.json(livro)
		} catch (error) {
			console.log(error)
			return res.status(500).json({ message: 'Internal Sever Error' })
		}
	}

	/**************************** ATUALIZAR AUTOR ******************************/
	async atualizarAutor(req: Request, res: Response) {
		const { idAutor } = req.params

		try {
			const autor = await autorRepository.findOneBy({
				idautor: Number(idAutor),
			})

			if (!autor) {
				return res.status(404).json({ message: 'Autor não encontrado.' })
			}

			autorRepository.merge(autor, req.body)
			const results = await autorRepository.save(autor)
			return res.send(results)
		} catch (error) {
			console.log(error)
			return res.status(500).json({ message: 'Internal Sever Error' })
		}
	}

	/**************************** ATUALIZAR LIVRO******************************/
	async atualizar(req: Request, res: Response) {
		const { idLivro } = req.params

		try {
			const livro = await livroRepository.findOneBy({
				idlivro: Number(idLivro),
			})

			if (!livro) {
				return res.status(404).json({ message: 'Livro não foi encontrado.' })
			}

			livroRepository.merge(livro, req.body)
			const results = await livroRepository.save(livro)
			return res.send(results)
		} catch (error) {
			console.log(error)
			return res.status(500).json({ message: 'Internal Sever Error' })

		}
	}

	/******************************* DELETAR *******************************/
	async deletar(req: Request, res: Response) {
		const { idLivro } = req.params

		try {
			const livro = await livroRepository.findOneBy({
				idlivro: Number(req.params.idLivro),
			})

			if (!livro) {
				return res.status(404).json({ message: 'Livro não foi encontrado.' })
			}

			const results = await livroRepository.remove(livro)
			return res.send(results)
		} catch (error) {
			console.log(error)
			return res.status(500).json({ message: 'Internal Sever Error' })
		}
	}

	/*************************** DELETAR AUTOR *******************************/
	async deletarAutor(req: Request, res: Response) {
		const { idAutor } = req.params

		try {
			const autor = await autorRepository.findOneBy({
				idautor: Number(idAutor),
			})

			if (!autor) {
				return res.status(404).json({ message: 'Autor não foi encontrado.' })
			}

			const results = await autorRepository.remove(autor)
			return res.send(results)
		} catch (error) {
			console.log(error)
			return res.status(500).json({ message: 'Internal Sever Error' })
		}
	}
}