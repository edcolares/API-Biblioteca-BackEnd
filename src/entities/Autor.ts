import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Livro } from "./Livro"

@Entity('autores') /*Será a tabela rooms no BD */
export class Autor {
    @PrimaryGeneratedColumn()
    idautor: number

    @Column({ type: 'text', nullable: false, comment: "Nome do autor" })
    nome: string

    @Column({ type: 'text', nullable: false, comment: "Pais de origem do autor" })
    pais_origem: string

    @ManyToOne(() => Livro, livro => livro.autores)
    @JoinColumn({ name: 'idlivro' })
    livro: Livro
    //alteração teste... @tirloni

    /** Comentario do Edvan */
}



