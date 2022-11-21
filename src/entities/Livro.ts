import {
	Column,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { Autor } from './Autor'
import { Emprestimo } from './Emprestimo'

/* Defini que é uma ENTIDADE */
@Entity('livros') /*Será a tabela rooms no BD */
export class Livro {
	@PrimaryGeneratedColumn()
	idlivro: number

	@Column({ type: 'text', nullable: false, comment: "Código ISBN do Livro" })
	isbn: string

	@Column({ type: 'text', nullable: false, comment: "Título do livro" })
	titulo: string

	@Column({ type: 'text', nullable: false, comment: "Editora do livro" })
	editora: string

	/* Type poderia ser YEAR */
	@Column({ type: 'text', nullable: false, comment: "Ano de publicação do livro" })
	ano_publicacao: string

	@Column({ type: 'text', nullable: false, comment: "Status: DISPONIVEL, LOCADO, DANIFICADO" })
	status: string

	/** eager: true faz com que as dependencias retornem na busca PARTE DELETADA > , { eager: true }*/
	@OneToMany(() => Autor, autor => autor.livro, { eager: true , onDelete:'CASCADE'})
	autores: Autor[]
	
	@OneToMany(() => Emprestimo, emprestimo => emprestimo.livro, { eager: true , onDelete:'CASCADE'})
	emprestimos: Emprestimo[]	
}