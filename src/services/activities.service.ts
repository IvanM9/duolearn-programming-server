import { Conexion } from "@/models/conexion";
import { Service } from "typedi";

@Service()
export class ActivitiesService {
    private conexion: Conexion;

    constructor() {
        this.conexion = new Conexion();
    }
    //Se llama a la función para obtener las actividades
    obtenerActividades = async (modulo, lenguaje, tipo, usuario) => {
        try {
            return await this.conexion.executeProcedureReturnsTable(
                "obtener_actividades",
                [tipo, modulo, lenguaje, usuario]);
        } catch (error) {
            return null
        }
    }


    //Se envian los datos de la actividad a la base de datos
    resolverActividad = async (usuario, id_actividad, fecha, minutos, intentos, num_actividad, puntaje) => {
        try {
            return await this.conexion.executeProcedureReturnsString("usar_actividad",
                [usuario, id_actividad, fecha, minutos, intentos, num_actividad, puntaje]);

        } catch (error) {
            return null;
        }
    }

    //Se envian los datos para crear una nueva actividad
    añadirActividad = async (tema, pregunta, opcion_correcta, opcion2, opcion3, opcion4, tipo) => {
        try {
            return await this.conexion.executeProcedureReturnsInt(
                "agregar_actividad",
                [tema, pregunta, opcion_correcta, opcion2, opcion3, opcion4, tipo]);
        } catch (error) {
            console.log(error);
            return 0;
        }
    }


    //Se envían los datos para crear un nuevo tema 
    añadirTema = async (modulo, lenguaje, titulo, concepto) => {
        try {
            await this.conexion.executeProcedureReturnsInt(
                "nuevo_tema",
                [modulo, lenguaje, concepto, titulo]);
            return 1;
        } catch (error) {
            console.log(error);
            return 0;
        }
    }

    // Se ejecuta para eliminar una actividad con una id especifica
    eliminarActividad = async (id) => {
        try {
            return await this.conexion.executeProcedureReturnsInt("eliminar_actividad", [id]);
        } catch (error) {
            console.log(error);
            return 0;
        }
    }

    // Se elimina un tema con todas sus actividades
    eliminarTema = async (id) => {
        try {
            return await this.conexion.executeProcedureReturnsInt("eliminar_tema", [id]);
        } catch (error) {
            console.log(error);
            return 0;
        }

    }

    // Se modifican los datos de una actividad
    modificarActividad = async (id, tema, pregunta, opcion_correcta, opcion2, opcion3, opcion4, tipo) => {
        try {
            return await this.conexion.executeProcedureReturnsInt(
                "modificar_actividad",
                [id, tema, pregunta, opcion_correcta, opcion2, opcion3, opcion4, tipo]);
        } catch (error) {
            console.log(error);
            return 0;
        }
    }

    // Se modifican los datos de un tema
    modificarTema = async (id, modulo, lenguaje, concepto, titulo) => {
        try {
            return await this.conexion.executeProcedureReturnsInt("modificar_tema", [id, modulo, lenguaje, concepto, titulo]);
        } catch (error) {
            return null;
        }
    }

    // Se obtiene todos los datos de la tabla temas
    obtenerTemas = async (modulo, lenguaje) => {
        try {
            return await this.conexion.executeProcedureReturnsTable(
                "obtener_temas",
                [modulo, lenguaje]);
        } catch (error) {
            return null;
        }
    }

    // Se obtiene todos los temas desde la base de datos
    listarTemas = async () => {
        try {
            return await this.conexion.executeProcedureReturnsTable("listar_temas", null);
        } catch (error) {
            return null;
        }
    }
}