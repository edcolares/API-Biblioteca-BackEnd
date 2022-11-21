import {
	Column,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm'

import { Emprestimo } from './Emprestimo'

/* Defini que é uma ENTIDADE */
@Entity('clientes') /*Será a tabela rooms no BD */
export class Cliente {
	@PrimaryGeneratedColumn()
	idcliente: number

	@Column({ type: 'text', nullable: false, comment: "Matricula do Cliente" })
	matricula: string

	@Column({ type: 'text', nullable: false, comment: "Nome do Cliente" })
	nome: string

	@Column({ type: 'int', nullable: false, comment: "Telefone do Cliente" })
	telefone: string

	@Column({ type: 'int', nullable: true, comment: "Quantidade de Livro que o Cliente tem locado" })
	livros_locado: string

	@OneToMany(() => Emprestimo, emprestimo => emprestimo.cliente, { eager: true , onDelete:'CASCADE'})
	emprestimos: Emprestimo[]

}