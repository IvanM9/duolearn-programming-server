import * as url from 'url';
import { Client, Pool, PoolClient } from 'pg';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from '@config';
require('dotenv').config();

export class Conexion {
  private readonly database: Pool;
  private config: any;
  constructor() {
    if (process.env.DATABASE_URL) {
      const params = url.parse(process.env.DATABASE_URL);
      const auth = params.auth.split(':');

      this.config = {
        user: auth[0],
        password: auth[1],
        host: params.hostname,
        port: params.port,
        database: params.pathname.split('/')[1],
      };
    } else {
      this.config = {
        user: DB_USER,
        host: DB_HOST,
        password: DB_PASSWORD,
        database: DB_NAME,
        port: DB_PORT || '5432',
      };
    }

    this.config.ssl = {
      rejectUnauthorized: false,
    };

    this.database = new Pool(this.config);

  }

  private async desconect(connect: PoolClient) {
    connect.release();
  }

  private async connect() {
    return await this.database.connect();
  }

  private async queryWithValues(query: string, params: any[]): Promise<any> {
    return this.database.query(query, params);
  }

  private async query(query: string) {
    return await this.database.query(query);
  }

  private async executeProcedure(name: string, params: any[] | null): Promise<any> {
    try {
      let retorno: any;
      if (params == null || params.length == 0) retorno = (await this.query(`select ${name} ()`)).rows;
      else {
        const element: string[] = [];
        for (let index = 1; index <= params.length; index++) {
          element.push('$' + index);
        }
        retorno = (await this.queryWithValues(`select ${name} (${element.join(', ')})`, params)).rows;
      }

      return retorno;
    } catch (error) {
      console.error(error);
      throw new Error('Error: ' + error);
    }
  }

  async executeProcedureReturnsTable(name: string, params?: any[] | null) {
    try {
      const table = await this.executeProcedure(name, params);

      if (!Array.isArray(table)) throw new Error('El procedimiento almacenado no devuelve una tabla');

      if (table.length > 1) {
        const aux = [];

        for (const element of table) {
          aux.push(element[name]);
        }

        return aux;
      } else return table[0][name];
    } catch (error) {
      throw error;
    }
  }

  async executeProcedureReturnsString(name: string, params: any[] | null): Promise<string> {
    try {
      const scalar = (await this.executeProcedure(name, params))[0][name];

      if (Array.isArray(scalar)) throw new Error('El procedimiento almacenado no devuelve un valor escalar');

      if (typeof scalar !== 'string') throw new Error('El valor que retorna no es de tipo String');

      return scalar;
    } catch (error) {
      throw error;
    }
  }

  async executeProcedureReturnsInt(name: string, params: any[] | null): Promise<number> {
    try {
      const scalar = (await this.executeProcedure(name, params))[0][name];

      if (Array.isArray(scalar)) throw new Error('El procedimiento almacenado no devuelve un valor escalar');

      if (typeof scalar !== 'number') throw new Error('El valor que retorna no es de tipo Int');

      return scalar;
    } catch (error) {
      throw error;
    }
  }

  async executeProcedureReturnsBoolean(name: string, params: any[] | null): Promise<boolean> {
    try {
      const scalar = (await this.executeProcedure(name, params))[0][name];

      if (Array.isArray(scalar)) throw new Error('El procedimiento almacenado no devuelve un valor escalar');

      if (typeof scalar !== 'boolean') throw new Error('El valor que retorna no es de tipo Boolean');

      return scalar;
    } catch (error) {
      throw error;
    }
  }
}
