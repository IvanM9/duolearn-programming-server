import { Conexion } from '@/models/conexion';
import { Service } from 'typedi';

@Service()
export class StadisticsService {
  private conexion: Conexion;

  constructor() {
    this.conexion = new Conexion();
  }
  async getJava(usuario: string) {
    try {
      return await this.conexion.executeProcedureReturnsTable('obtener_puntaje_java', [usuario]);
    } catch (error) {
      return null;
    }
  }

  //Se obtienen las calificaciones de c#
  async getCsharp(usuario: string) {
    try {
      return await this.conexion.executeProcedureReturnsTable('obtener_puntaje_csharp', [usuario]);
    } catch (error) {
      return null;
    }
  }
}
