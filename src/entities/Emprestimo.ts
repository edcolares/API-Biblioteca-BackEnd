import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Cliente } from "./Cliente"
import { Livro } from "./Livro"

@Entity('emprestimos')
export class Emprestimo{
    @PrimaryGeneratedColumn()
    idemprestimo: number
    
    @Column({type: 'date', comment: "Data em que foi realizado o emprestimo"})
    data_emprestimo: Date

    @Column({type: 'date', comment: "Data prevista para o emprestimo acabar"})
    data_retorno: Date

    @Column({type: 'date', nullable: true, comment: "Data em que houve a devolução do emprestimo"})
    data_devolucao: Date

    @Column({type: 'int', nullable: true, comment: "Quantidade de dias em que o livro foi devolvido com atraso"})
    dias_atraso: number

    @ManyToOne(() => Livro, livro => livro.emprestimos, {eager: true})
    @JoinColumn({ name: 'idlivro' })
    livro: Livro

    @ManyToOne(() => Cliente, cliente => cliente.emprestimos, {eager: true})
    @JoinColumn({ name: 'idcliente' })
    cliente: Cliente
}