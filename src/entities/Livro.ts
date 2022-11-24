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

	@Column({ type: 'varchar', length: 13, nullable: false, comment: "Código ISBN do Livro" })
	isbn: string

	@Column({ type: 'varchar', length: 150, nullable: false, comment: "Título do livro" })
	titulo: string

	@Column({ type: 'varchar', length: 100, nullable: false, comment: "Editora do livro" })
	editora: string

	/* Type poderia ser YEAR */
	@Column({ type: 'int', nullable: true, comment: "Ano de publicação do livro" })
	ano_publicacao: number

	@Column({ type: 'enum', enum: ["disponivel", "locado", "cancelado"], nullable: false, comment: "Status: DISPONIVEL, LOCADO, CANCELADO" })
	status: string

	/** eager: true faz com que as dependencias retornem na busca PARTE DELETADA > , { eager: true }*/
	@OneToMany(() => Autor, autor => autor.livro, { eager: true , cascade: ['remove']})
	autores: Autor[]
	
	@OneToMany(() => Emprestimo, emprestimo => emprestimo.livro)
	emprestimos: Emprestimo[]	
}