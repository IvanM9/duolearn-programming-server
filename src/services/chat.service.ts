import { Conexion } from "@/models/conexion";
import { Service } from "typedi";

@Service()
export class ChatService{
    private conexion: Conexion;
    constructor(){
        this.conexion = new Conexion();
    }

    nuevoMensaje = async (usuario, mensaje, fecha) => {
        try {
            let status = await this.conexion.executeProcedureReturnsTable("nuevo_mensaje", [usuario, mensaje, fecha]);
            return status.rows[0].nuevo_mensaje;
    
        } catch (error) {
            return null;
        }
    
    }
    
    // Se obtienen todos los mensajes guardados
    obtenerMensajes = async () => {
        try {
            let datos = await this.conexion.executeProcedureReturnsTable("obtener_chat()", null);
            let aux = [];
            datos.rows.forEach(elemet => {
                aux.push(elemet.obtener_chat);
            });
            return aux;
        } catch (error) {
            return null;
        }
    
    }
}