import { Socket } from 'socket.io';
import socketIO from 'socket.io';

// Escuchar desconexiones
export const disconnect = ( client: Socket ) => {

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
    
}

// Escuchar Mensajes
export const message = ( client: Socket, io: socketIO.Server ) => {
    
    client.on('message', ( payload: { user: string, text: string }, callback) => {
        
        console.log('Mensaje recibido: ', payload );

        io.emit('new-message', payload );
        
    }); 
}