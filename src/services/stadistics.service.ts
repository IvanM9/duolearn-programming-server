import { Conexion } from "@/models/conexion";
import { Service } from "typedi";

@Service()
export class StadisticsService {
    private conexion: Conexion;

    constructor() {
        this.conexion = new Conexion();
    }
    async getJava(usuarioId: number) {
        try {
            return await this.conexion.executeProcedureReturnsTable("obtener_puntaje_java", [usuarioId]);
        } catch (error) {
            return null;
        }
    }

    //Se obtienen las calificaciones de c#
    async getCsharp(usuarioId: number) {
        try {
            return await this.conexion.executeProcedureReturnsTable("obtener_puntaje_csharp", [usuarioId]);
        } catch (error) {
            return null;
        }
    }
}