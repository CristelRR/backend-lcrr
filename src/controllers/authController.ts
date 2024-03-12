import { Request, Response } from "express" ; 
import validator from "validator";
import model from "../models/authModelo";
import { utils } from "../utils/utils";
import jwt from 'jsonwebtoken';

/**
 * Método para validar Inicio de sesión
 * @param req Petición
 * @param res respuesta
 * @returns
 */

class Authcontroller { 
    public async iniciarSesion(req: Request, res: Response){
        try{
            const{email, password} =  req.body;
    
            //Verificar que los datos no esten vacíos
            if(validator.isEmpty(email.trim()) || validator.isEmpty(password.trim())){
                return res.status(400).json({message: "Los campos son requeridos", code:1});
            } 

            const ltsUsers = await model.getUserByEmail(email);
            
            //Verificar que los campos sean correctos
            if(ltsUsers.length <= 0){
                return res.status(404).json({message: "El usuario y/o contraseña es incorrecto", code:1});
            }

            console.log(ltsUsers[0].username, ltsUsers[0].password);
            
            let result = utils.checkPassword(password, ltsUsers[0].password);
            result.then((value)=>{
                if(value){   
                    const newUser = {
                        email: ltsUsers[0].email,
                        password: ltsUsers[0].password,
                        role: ltsUsers[0].role
                    } 

                    console.log(process.env.SECRET)
                    const env = require('dotenv').config();
                    let token = jwt.sing(newUser, process.env.SECRET, {expiresIn: '1h'})
                    return res.json({message: "Autenticación correcta", code:0});
                }else{
                    return res.json({message: "Password Incorrecto", code:1});
                }
            })

        }catch(error: any){
            return res.status(500).json({message: `${error.message}`})
        }
    }
}

export const authController = new Authcontroller();

