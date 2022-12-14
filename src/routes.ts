import { Router } from 'express'
import authMiddleware from './middlewares/authMiddleware'
import { ClienteController } from './controllers/ClienteController'
import { LivroController } from './controllers/LivroController'
import { EmprestimoController} from './controllers/EmprestimoController'
import { UserController } from './controllers/UserController'


const routes = Router()
const livro = new LivroController()
const cliente = new ClienteController()
const emprestimo = new EmprestimoController()

const user = new UserController()


// ROTAS PARA USUÁRIOS
routes.post('/users',user.store )
routes.post('/auth', user.authenticate)

// ROTAS PARA LIVROS
//routes.post('/livro', authMiddleware,livro.create)
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
routes.get('/autor/:idAutor', livro.buscarPorIdAutor)

// ROTAS PARA CLIENTES
routes.post('/cliente', cliente.create)
routes.put('/cliente/:idCliente', cliente.update)
routes.get('/cliente', cliente.list)
routes.delete('/cliente/:idCliente', cliente.delete)

// ROTAS PARA EMPRESTIMOS
routes.post('/emprestimo', emprestimo.locacao)
routes.put('/emprestimo/:idEmprestimo', emprestimo.devolucao)

export default routes