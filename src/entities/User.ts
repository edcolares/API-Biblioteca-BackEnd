import { Column, Entity, PrimaryGeneratedColumn,BeforeInsert, BeforeUpdate } from "typeorm"
import bcrypt from "bcryptjs"

@Entity('users')
export class User{
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    email: string
    
    @Column()
    password: string

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword(){
        this.password = bcrypt.hashSync(this.password, 8)
    }
}

