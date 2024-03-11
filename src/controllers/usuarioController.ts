import { Request, Response } from "express";
import validator from "validator";
import model from "../models/usuarioModelo";

class UsuarioController {

    public async list(req: Request, res: Response) {
        try {
            const users = await model.list();
            return res.json({ message: "Listado de Usuario", users: users, code: 0 });
        } catch (error: any) {
            // Manejar errores
            return res.status(500).json({ message: error.message });
        }
    }

    public async add(req: Request, res: Response) {
        try {
            const { email, password, role } = req.body;

            if (!email || !password || !role) {
                return res.status(400).json({ message: "Todos los campos son requeridos", code: 1 });
            }

            const existingUser = await model.findByEmail(email);
            if (existingUser.length > 0) {
                return res.status(400).json({ message: "Ya existe un usuario con este email", code: 1 });
            }

            // Agregar el usuario
            await model.add({ email, password, role });

            return res.json({ message: "Usuario agregado correctamente", code: 0 });
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    public async update(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            // Verificar si el usuario existe
            const existingUser = await model.findByEmail(email);
            if (existingUser.length === 0) {
                return res.status(404).json({ message: "El usuario no existe", code: 1 });
            }

            // Actualizar el usuario
            await model.update({ email, password });

            return res.json({ message: "Usuario actualizado correctamente", code: 0 });
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            const email = req.body.email;

            // Verificar si el usuario existe
            const existingUser = await model.findByEmail(email);
            if (existingUser.length === 0) {
                return res.status(404).json({ message: "El usuario no existe", code: 1 });
            }

            // Eliminar el usuario
            await model.delete(email);

            return res.json({ message: "Usuario eliminado correctamente", code: 0 });
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export const usuarioController = new UsuarioController();