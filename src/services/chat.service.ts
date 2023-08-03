import { Conexion } from '@/models/conexion';
import { Service } from 'typedi';

@Service()
export class ChatService {
  private conexion: Conexion;
  constructor() {
    this.conexion = new Conexion();
  }

  nuevoMensaje = async (usuario, mensaje, fecha) => {
    try {
      const status = await this.conexion.executeProcedureReturnsTable('nuevo_mensaje', [usuario, mensaje, fecha]);
      return status.rows[0].nuevo_mensaje;
    } catch (error) {
      return null;
    }
  };

  // Se obtienen todos los mensajes guardados
  obtenerMensajes = async () => {
    try {
      const datos = await this.conexion.executeProcedureReturnsTable('obtener_chat', null);
      const aux = [];
      datos.rows.forEach(element => {
        aux.push(element.obtener_chat);
      });
      return aux;
    } catch (error) {
      return null;
    }
  };
}
