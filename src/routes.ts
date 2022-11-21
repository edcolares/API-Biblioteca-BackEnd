import { Router } from 'express'
import { LivroController } from './controllers/LivroController'
import { livroRepository } from './repositories/livroRepository'
//import { SubjectController } from './controllers/SubjectController'

const routes = Router()
const livro = new LivroController()


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


//routes.post('/subject', new SubjectController().create)
//routes.post('/room/:idRoom/subject', new RoomController().roomSubject)


export default routes