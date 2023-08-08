import { Service } from 'typedi';
import { Conexion } from '@/models/conexion';

@Service()
export class UserService {
  private conexion: Conexion;
  constructor() {
    this.conexion = new Conexion();
  }

  listarUsuarios = async () => {
    try {
      return await this.conexion.executeProcedureReturnsTable('listar_usuarios');
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  //Llama a la función para obtener los datos de 1 usuario
  getUser = async usuario => {
    try {
      return await this.conexion.executeProcedureReturnsTable('obtener_usuario', [usuario]);
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  //Se envian datos de inicio de sesión para su verificación
  inciarSesion = async (usuario, clave) => {
    try {
      return await this.conexion.executeProcedureReturnsInt('inicio_sesion', [usuario, clave]);
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  //Se envian los datos para hacer la actualización
  modificarUser = async (usuario, nombres, apellidos, correo, fecha_nacimiento) => {
    try {
      return await this.conexion.executeProcedureReturnsInt('modificar_usuario', [usuario, nombres, apellidos, correo, fecha_nacimiento]);
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  //Se envian los datos para registrar un nuevo usuario
  registrarUser = async (usuario, nombres, apellidos, correo, clave, fecha_nacimiento) => {
    try {
      return await this.conexion.executeProcedureReturnsInt('nuevo_usuario', [
        usuario,
        nombres,
        apellidos,
        correo,
        clave,
        'estudiante',
        fecha_nacimiento,
      ]);
    } catch (error) {
      return null;
    }
  };

  //Se envía el usuario que se va a eliminar
  eliminarUser = async usuario => {
    try {
      return await this.conexion.executeProcedureReturnsInt('eliminar_usuario', [usuario]);
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  cambiarClave = async (usuario, clave_actual, clave_nuevo) => {
    try {
      return await this.conexion.executeProcedureReturnsInt('cambiar_clave', [usuario, clave_actual, clave_nuevo]);
    } catch (error) {
      return null;
    }
  };
  obtenerClave = async usuario => {
    try {
      return await this.conexion.executeProcedureReturnsString('obtener_clave($1)', [usuario]);
    } catch (error) {
      return null;
    }
  };

  // Se alamacena el token en la base de datos
  asignarToken = async (usuario, token) => {
    try {
      return await this.conexion.executeProcedureReturnsInt('agregar_token', [usuario, token]);
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  // Se compara el token con el almacenado en la base de datos
  // Se cambia la contraseña
  resetClave = async (usuario, nueva_clave, token) => {
    try {
      return await this.conexion.executeProcedureReturnsInt('select reset_clave', [usuario, nueva_clave, token]);
    } catch (error) {
      return 0;
    }
  };
}
