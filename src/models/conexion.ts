import * as url from 'url';
import { Pool, Client } from 'pg';
require('dotenv').config();

export class Conexion {
  private readonly database: Client;
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
        ssl: {
          rejectUnauthorized: false,
        },
      };
    } else {
      this.config = {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: '5432',
      };
    }
    this.database = new Client(this.config);
    if (this.database.connect()) console.log('Conexion exitosa');
    else console.log('Conexion fallida');
  }

  private desconect() {
    this.database.end();
  }

  private connect() {
    this.database.connect();
  }

  private async queryWithValues(query: string, params: any[]): Promise<any> {
    this.connect();
    const data = this.database.query(query, params);
    this.desconect();

    return data;
  }

  private async query(query: string) {
    this.connect();

    const data = this.database.query(query);

    this.desconect();

    return data;
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

  async executeProcedureReturnsTable(name: string, params: any[] | null) {
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

  async executeProcedureReturnsScalar(name: string, params: any[] | null) {
    try {
      const scalar = await this.executeProcedure(name, params);

      if (Array.isArray(scalar)) throw new Error('El procedimiento almacenado no devuelve un valor escalar');

      console.log(scalar);
      return scalar;
    } catch (error) {
      throw error;
    }
  }
}
