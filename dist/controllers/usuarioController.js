"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarioController = void 0;
const usuarioModelo_1 = __importDefault(require("../models/usuarioModelo"));
class UsuarioController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield usuarioModelo_1.default.list();
                return res.json({ message: "Listado de Usuario", users: users, code: 0 });
            }
            catch (error) {
                // Manejar errores
                return res.status(500).json({ message: error.message });
            }
        });
    }
    add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password, role } = req.body;
                if (!email || !password || !role) {
                    return res.status(400).json({ message: "Todos los campos son requeridos", code: 1 });
                }
                const existingUser = yield usuarioModelo_1.default.findByEmail(email);
                if (existingUser.length > 0) {
                    return res.status(400).json({ message: "Ya existe un usuario con este email", code: 1 });
                }
                // Agregar el usuario
                yield usuarioModelo_1.default.add({ email, password, role });
                return res.json({ message: "Usuario agregado correctamente", code: 0 });
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                // Verificar si el usuario existe
                const existingUser = yield usuarioModelo_1.default.findByEmail(email);
                if (existingUser.length === 0) {
                    return res.status(404).json({ message: "El usuario no existe", code: 1 });
                }
                // Actualizar el usuario
                yield usuarioModelo_1.default.update({ email, password });
                return res.json({ message: "Usuario actualizado correctamente", code: 0 });
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const email = req.body.email;
                // Verificar si el usuario existe
                const existingUser = yield usuarioModelo_1.default.findByEmail(email);
                if (existingUser.length === 0) {
                    return res.status(404).json({ message: "El usuario no existe", code: 1 });
                }
                // Eliminar el usuario
                yield usuarioModelo_1.default.delete(email);
                return res.json({ message: "Usuario eliminado correctamente", code: 0 });
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        });
    }
}
exports.usuarioController = new UsuarioController();
//# sourceMappingURL=usuarioController.js.map