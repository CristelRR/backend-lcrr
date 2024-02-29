import express,  {Application} from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes';

class Server {
  private app: Application;

  //Inicialización de la clase
  constructor(){
    this.app =  express();
    this.config();
    this.routes();
    this.app.listen(this.app.get("port"), ()=>{
      console.log("Server on port", this.app.get("port"));
    });

  }

  //Configuración de módulos
  config(): void{
    //Configuración del puerto paraa el servidor
    this.app.set("port", 3000);
    
    //muestra las peticiones en la consola
    this.app.use(morgan("dev"));

    //puertos de conexión de la API
    this.app.use(cors());

    //Solo se permiten peticiones en formato JSON
    this.app.use(bodyParser.json());

    this.app.use(bodyParser.urlencoded({extends: false,}),);

  }

  //Configurar la rutas
  routes(){
    this.app.use("/", authRoutes);

  }

}

const server = new Server();
