import { Request, Response } from "express" ; 

class Authcontroller { 
    public async iniciarSesion(req: Request, res: Response) { 
        const {email, password} = req.body;     
        return res.json ({message : "Autenticación correcta",
        email: email, 
        password: password }); 
    }
}

export const authController = new Authcontroller();

