import { Request, Response } from "express" ; 
import validator from "validator";
import model from "../models/authModelo";
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
    
            return res.json({message: "Autenticación correcta", code:0});

        }catch(error: any){
            return res.status(500).json({message: `${error.message}`})
        }
    }
}

export const authController = new Authcontroller();

