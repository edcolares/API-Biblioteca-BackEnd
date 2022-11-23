import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


export class UserController{
    async store(req: Request, res: Response){
        const {email, password} = req.body        
        
        const userExists = await userRepository.findOne({where: {email}})
        

        if (userExists) {
            return res.sendStatus(409).json({message:"Conflito de usuário"})
        }
        const user = await userRepository.create({email, password})
        await userRepository.save(user)

        return res.json(user)
    }

    async authenticate(req: Request, res: Response){
        const {email, password} = req.body        
        
        const user = await userRepository.findOne({where: {email}})

        if(!user){
            return res.sendStatus(401).json({message:"Acesso não autorizado!"})
        }
        
        const isValidPassword = await bcrypt.compare(password, user.password)

        if(!isValidPassword){
            return res.sendStatus(401).json({message:"Erro de senha, acesso não autorizado!"})
        }
        const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1d' })

        //delete user.password

        return res.json({
            user,
            token
        })
        
    }

}