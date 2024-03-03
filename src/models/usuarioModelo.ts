import pool from '../config/connections';
import { Connection } from "promise-mysql";

class UsuarioModelo{ 

    public async list(){
        const result = await pool.then(async (connection) =>{
            return await connection.query("SELECT u.email, u.password, u.role " + " FROM tbl_usuario u ");
        });
        return result;
    }

    public async add(usuario: any){
        const result = await pool.then(async (connection) =>{
            return await connection.query("INSERT INTO tbl_usuario SET ? ", [usuario]);
        });
        return result;
    }

    public async update(usuario: any){
        const update = "UPDATE tbl_usuario SET password:'" + usuario.password + "' WHERE email = '" + usuario.email + "'";
        console.log("UPDATE " + this.update)

        const result = await pool.then(async (connection) =>{
            return await connection.query(update);
        });
        return result;
    }

    public async delete(email: string){
        console.log('Eliminado');
        const result = await pool.then(async(connection) => {
            return await connection.query(
                "DELETE FROM tbl_usuario WHERE email = ?", [email]
            );
        });
        return result;
    }
}

const model = new UsuarioModelo();
export default model;