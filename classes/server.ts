import express from 'express';
import { PORT } from '../global/enviroment';
import socketIO from 'socket.io';
import http from 'http';

import * as socket from '../sockets/socket';

export default class Server {

    public static _instance: Server;
    public app: express.Application;
    public port: number;
    public io: socketIO.Server;
    private httpServer: http.Server;

    private constructor() {
        this.app = express();
        this.port = PORT;
        this.httpServer = new http.Server( this.app );
        this.io = socketIO( this.httpServer );
        this.listeningSockets();
    }

    public static getInstance(){

        return this._instance || ( this._instance = new this() );
        
    }

    private listeningSockets(){

        console.log('Escuchndo conexiones...');

        this.io.on('connection', client => {

            // Agregar a la lista de usuarios
            socket.addClient( client );

            // Escuchar Mensajes
            socket.message( client, this.io );
            
            // Escuchar Desconexiones
            socket.disconnect( client );

            // Configurar Usuario
            socket.loginUser( client, this.io  );

        });

    }

    start( callback: VoidFunction ) {

        this.httpServer.listen( this.port, callback );
        
    }
}