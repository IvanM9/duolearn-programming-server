import { Conexion } from '@/models/conexion';
import { Service } from 'typedi';

@Service()
export class StadisticsService {
  private conexion: Conexion;

  constructor() {
    this.conexion = new Conexion();
  }
  async getPuntajesPorModulo(usuario: number, modulo: number) {
    try {
      return await this.conexion.executeProcedureReturnsTable('listar_puntaje_por_modulo', [usuario, modulo]);
    } catch (error) {
      return null;
    }
  }
}
