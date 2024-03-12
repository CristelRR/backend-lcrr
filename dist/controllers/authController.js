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
exports.authController = void 0;
const validator_1 = __importDefault(require("validator"));
const authModelo_1 = __importDefault(require("../models/authModelo"));
const utils_1 = require("../utils/utils");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * Método para validar Inicio de sesión
 * @param req Petición
 * @param res respuesta
 * @returns
 */
class Authcontroller {
    iniciarSesion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                //Verificar que los datos no esten vacíos
                if (validator_1.default.isEmpty(email.trim()) || validator_1.default.isEmpty(password.trim())) {
                    return res.status(400).json({ message: "Los campos son requeridos", code: 1 });
                }
                const ltsUsers = yield authModelo_1.default.getUserByEmail(email);
                //Verificar que los campos sean correctos
                if (ltsUsers.length <= 0) {
                    return res.status(404).json({ message: "El usuario y/o contraseña es incorrecto", code: 1 });
                }
                console.log(ltsUsers[0].username, ltsUsers[0].password);
                let result = utils_1.utils.checkPassword(password, ltsUsers[0].password);
                result.then((value) => {
                    if (value) {
                        const newUser = {
                            email: ltsUsers[0].email,
                            password: ltsUsers[0].password,
                            role: ltsUsers[0].role
                        };
                        console.log(process.env.SECRET);
                        const env = require('dotenv').config();
                        let token = jsonwebtoken_1.default.sing(newUser, process.env.SECRET, { expiresIn: '1h' });
                        return res.json({ message: "Autenticación correcta", code: 0 });
                    }
                    else {
                        return res.json({ message: "Password Incorrecto", code: 1 });
                    }
                });
            }
            catch (error) {
                return res.status(500).json({ message: `${error.message}` });
            }
        });
    }
}
exports.authController = new Authcontroller();
//# sourceMappingURL=authController.js.map