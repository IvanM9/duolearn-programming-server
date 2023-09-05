import { Conexion } from '@/models/conexion';
import { Service } from 'typedi';

@Service()
export class ActivitiesService {
  private conexion: Conexion;

  constructor() {
    this.conexion = new Conexion();
  }
  //Se llama a la función para obtener las actividades
  obtenerActividades = async (modulo, activo?: boolean) => {
    try {
      return await this.conexion.executeProcedureReturnsTable('listar_actividades_por_modulo', [modulo, activo]);
    } catch (error) {
      return null;
    }
  };

  //Se llama a la función para obtener las actividades
  obtenerActividadesAll = async (estado:boolean) => {
    try {
      return await this.conexion.executeProcedureReturnsTable('obtener_actividades_all', [estado]);
    } catch (error) {
      return null;
    }
  };

  //Se llama a la función para obtener una actividad por id
  obtenerActividadId = async (id: any) => {
    try {
      return await this.conexion.executeProcedureReturnsTable('obtener_actividad_por_id', [id]);
    } catch (error) {
      return null;
    }
  };

  //Se llama a la función para obtener una actividad por id
  obtenerActividadesNoResueltas = async (usuarioId: any, moduloId: any, tipoPregunta: any) => {
    try {
      return await this.conexion.executeProcedureReturnsTable('obtener_actividades_no_resueltas', [usuarioId, moduloId, tipoPregunta]);
    } catch (error) {
      return null;
    }
  };

  //Se envian los datos de la actividad a la base de datos
  resolverActividad = async (usuario, id_actividad, minutos, intentos, num_actividad, puntaje) => {
    try {
      return await this.conexion.executeProcedureReturnsInt('agregar_puntaje', [id_actividad, usuario, minutos, intentos, num_actividad, puntaje]);
    } catch (error) {
      return null;
    }
  };

  //Se envian los datos para crear una nueva actividad
  añadirActividad = async (tema, pregunta, opcion_correcta, opcion2, opcion3, opcion4, tipo) => {
    try {
      return await this.conexion.executeProcedureReturnsInt('agregar_actividad', [tema, pregunta, opcion_correcta, opcion2, opcion3, opcion4, tipo]);
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  //Se envían los datos para crear un nuevo tema
  agregarModulo = async (lenguajeId, titulo, concepto, icono) => {
    try {
      return await this.conexion.executeProcedureReturnsInt('agregar_modulo_por_lenguaje', [lenguajeId, concepto, titulo, icono]);
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  agregarLenguaje = async (titulo, descripcion, portada) => {
    try {
      return await this.conexion.executeProcedureReturnsInt('agregar_lenguaje', [titulo, descripcion, portada]);
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  // Se ejecuta para eliminar una actividad con una id especifica
  eliminarActividad = async id => {
    try {
      return await this.conexion.executeProcedureReturnsInt('eliminar_actividad', [id]);
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  // Se elimina un tema con todas sus actividades
  eliminarTema = async id => {
    try {
      return await this.conexion.executeProcedureReturnsInt('eliminar_tema', [id]);
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  // Se modifican los datos de una actividad
  modificarActividad = async (id, tema, pregunta, opcion_correcta, opcion2, opcion3, opcion4, tipo) => {
    try {
      return await this.conexion.executeProcedureReturnsInt('modificar_actividad', [
        Number.parseInt(id),
        Number.parseInt(tema),
        pregunta,
        opcion_correcta,
        opcion2,
        opcion3,
        opcion4,
      ]);
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  // Se modifican los datos de un tema
  modificarTema = async (id, concepto, titulo, icono) => {
    try {
      return await this.conexion.executeProcedureReturnsInt('modificar_modulo', [id, concepto, titulo, icono]);
    } catch (error) {
      return null;
    }
  };

  modificarLenguaje = async (id, titulo, descripcion, portada) => {
    try {
      return await this.conexion.executeProcedureReturnsInt('modificar_lenguaje', [id, titulo, descripcion, portada]);
    } catch (error) {
      return null;
    }
  };

  // Se obtiene todos los datos de la tabla temas
  obtenerTemas = async (lenguaje, activo?: boolean) => {
    try {
      return await this.conexion.executeProcedureReturnsTable('listar_modulos_por_lenguaje', [lenguaje, activo]);
    } catch (error) {
      return null;
    }
  };

  // Se obtiene todos los temas desde la base de datos
  //TODO: falta procedimiento
  listarTemas = async () => {
    try {
      return await this.conexion.executeProcedureReturnsTable('listar_temas', null);
    } catch (error) {
      return null;
    }
  };

  // Se obtiene todos los lenguajes desde la base de datos
  listarLenguajes = async (_estado_activo) => {
    try {
      return await this.conexion.executeProcedureReturnsTable('listar_lenguajes', [_estado_activo]);
    } catch (error) {
      return null;
    }
  };

  // Se obtiene todos los lenguajes desde la base de datos
  obtenerLenguajePorId = async id => {
    try {
      return await this.conexion.executeProcedureReturnsTable('obtener_lenguaje_por_id', [id]);
    } catch (error) {
      return null;
    }
  };

  // Se obtiene todos los lenguajes desde la base de datos
  obtenerModuloPorId = async id => {
    try {
      return await this.conexion.executeProcedureReturnsTable('obtener_modulo_por_id', [id]);
    } catch (error) {
      return null;
    }
  };

  cambiarEstadoActividad = async (id, estado) => {
    try {
      return await this.conexion.executeProcedureReturnsInt('cambiar_estado_actividad', [id, estado]);
    } catch (error) {
      return null;
    }
  };

  cambiarEstadoModulo = async (id, estado) => {
    try {
      return await this.conexion.executeProcedureReturnsInt('cambiar_estado_modulo', [id, estado]);
    } catch (error) {
      return null;
    }
  };

  cambiarEstadoLenguaje = async (id, estado) => {
    try {
      return await this.conexion.executeProcedureReturnsInt('cambiar_estado_lenguaje', [id, estado]);
    } catch (error) {
      return null;
    }
  };
}
