import { User } from './user';


export class UserList {

    private list: User[] = [];

    constructor() { }

    // Agregar un usuario a la lista
    public addUser( user: User ) {

        this.list.push( user );

        console.log( this.list );

        return user;
    }

    // Actualizo el nombre de usuario por id
    public nameUpdate( id: string, name: string ) {

        for ( let user of this.list) {

            if ( user.id === id ) {

                user.name = name;

                break;
            }
        }
        console.log('===== Actualizando usuario ====');
        console.log(this.list);
    }

    // Obtengo la lista de los usuarios
    public getUserList() {

        return this.list;
    }

    // Obtengo usuario por id
    public getUser( id: string ) {

        return this.list.find( user => user.id === id );
    }

    // Obtener Usuarios de una sala
    public getUsersRoom( room: string ) {

        return this.list.filter( user => user.room === room );
    }

    // Borrar un usuario de la lista
    public deleteUser( id: string ) {

        const tempUser = this.getUser( id );

        this.list = this.list.filter( user => user.id !== id );

        return tempUser;    
    }
}