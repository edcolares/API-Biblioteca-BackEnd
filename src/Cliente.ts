import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { Livro } from "./Livro"

@Entity('clientes')
export class Cliente{
    @PrimaryGeneratedColumn()
    idcliente: number
    
    @Column({type: 'text'})
    matricula: string

    @Column({type: 'text'})
    nome: string

    @Column({type: 'text'})
    telefone: string

    @Column({type: 'text'})
    livros_locados: string

    @ManyToMany(() => Livro, livro => livro.clientes)
    @JoinTable({
        name: 'livro_cliente',
        joinColumn:({
            name: 'idlivro',
            referencedColumnName: 'idlivro'
        }),
        inverseJoinColumn:({
            name: 'idcliente',
            referencedColumnName: 'idcliente'
        })

    })
    livros: Livro[]
}