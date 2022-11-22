import { Router } from 'express'
import { ClienteController } from './controllers/ClienteController'
import { LivroController } from './controllers/LivroController'

const routes = Router()
const livro = new LivroController()
const cliente = new ClienteController()

// ROTAS PARA LIVROS
routes.post('/livro', livro.create)
routes.get('/livro', livro.list)
routes.post('/livro/:idLivro/create', livro.createAutor)
routes.get('/livro/:idLivro', livro.buscarPorId)
routes.put('/livro/:idLivro', livro.atualizar)
routes.delete('/livro/:idLivro', livro.deletar)

// ROTAS PARA AUTOR
routes.put('/autor/:idAutor', livro.atualizarAutor)
routes.delete('/autor/:idAutor', livro.deletarAutor)
routes.get('/autor', livro.listAutor)

//ROTAS PARA CLIENTES
routes.post('/cliente', cliente.create)
routes.put('/cliente/:idCliente', cliente.update)
//routes.get('/cliente', cliente.list)

export default routes