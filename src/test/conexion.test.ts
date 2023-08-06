import { Conexion } from "@/models/conexion";

describe('Procedimiento almacenado que devuelve un entero', () => {

    it('Debe retornar 1', async () => {
        const conexion = new Conexion();
        const data = ['admin', '12345'];
        const result = await conexion.executeProcedureReturnsInt('inicio_sesion', data);

        expect(result).toBe(1);
    });
});

describe('Procedimiento almacenado que devuelve un string', () => {
    it('Debe retornar 12345', async () => {
        const conexion = new Conexion();
        const data = ['admin'];
        const result = await conexion.executeProcedureReturnsString('obtener_clave', data);
        expect(result).toBe('12345');
    });
});

describe('Procedimiento almacenado que devuelve una tabla', () => {
    it('Debe retornar un array', async () => {
        const conexion = new Conexion();
        const result = await conexion.executeProcedureReturnsTable('listar_temas', null);
        expect(Array.isArray(result)).toBe(true);
    });
});