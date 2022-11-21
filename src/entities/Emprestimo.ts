import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Cliente } from "./Cliente"
import { Livro } from "./Livro"

@Entity('emprestimos')
export class Emprestimo{
    @PrimaryGeneratedColumn()
    idemprestimo: number
    
    @Column({type: 'date'})
    data_emprestimo: string

    @Column({type: 'date'})
    data_retorno: string

    @Column({type: 'date'})
    data_devolucao: string

    @Column({type: 'int'})
    dias_atraso: string

    @ManyToOne(() => Livro, livro => livro.emprestimos)
    @JoinColumn({ name: 'idlivro' })
    livro: Livro

    @ManyToOne(() => Cliente, cliente => cliente.emprestimos)
    @JoinColumn({ name: 'idcliente' })
    cliente: Cliente
}