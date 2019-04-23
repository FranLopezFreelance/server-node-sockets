import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UserList } from '../classes/user-list';
import { User } from '../classes/user';

export const userList = new UserList();

export const addClient = ( client: Socket ) => {

    const user = new User( client.id );

    userList.addUser( user );

}

// Escuchar desconexiones
export const disconnect = ( client: Socket ) => {

    client.on('disconnect', () => {

        userList.deleteUser( client.id );
    });
    
}

// Escuchar Mensajes
export const message = ( client: Socket, io: socketIO.Server ) => {
    
    client.on('message', ( payload: { user: string, text: string }, callback) => {
        
        console.log('Mensaje recibido: ', payload );

        io.emit('new-message', payload );
        
    }); 
}

// Escuchar Login (configurar usuario)
export const loginUser = ( client: Socket, io: socketIO.Server ) => {
    
    client.on('user-config', ( payload: { name: string }, callback: Function) => {
        
        userList.nameUpdate( client.id, payload.name );

        callback({
            ok: true,
            message: `Usuario ${ payload.name } configurando...`
        });
    }); 
}