import request from 'supertest';
import { App } from '@/app';
import { UserController } from '@controllers/users.controller';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Serivicios de usuario', () => {
  describe('[POST] /login', () => {
    it('response statusCode 200 / login', () => {
      const data = {
        usuario: 'admin',
        clave: '12345',
      };

      const app = new App([UserController]);
      return request(app.getServer()).post('/iniciar_sesion').send(data).expect(200);
    });
  });

  describe('[GET] /usuario/datos/:id', () => {
    it('response statusCode 200 / usuario/datos/:id', () => {
      const app = new App([UserController]);
      return request(app.getServer()).get('/usuario/datos/7').expect(200);
    });
  });

  describe('[GET] /admin/usuarios/listar', () => {
    it('response statusCode 200 / admin/usuarios/listar', () => {
      const app = new App([UserController]);
      return request(app.getServer()).get('/admin/usuarios/listar').expect(200);
    });

    it('response statusCode 200 / admin/usuarios/listar?estado=true', () => {
      const app = new App([UserController]);
      return request(app.getServer()).get('/admin/usuarios/listar?estado=true').expect(200);
    });
  });

  describe('[POST] /usuario/crear', () => {
    it('response statusCode 200 / usuario/crear', () => {
      const data = {
        nombre: 'test',
        apellido: 'test',
        usuario: 'test',
        clave: 'test',
        correo: '',
        tipo: 'estudiante',
      };

      const app = new App([UserController]);
      return request(app.getServer()).post('/usuario/crear').send(data).expect(200);
    });
  });

  describe('[PUT] /usuario/modificar/:id', () => {
    it('response statusCode 200 / usuario/modificar/:id', () => {
      const data = {
        nombre: 'test nombre',
        apellido: 'test apellido',
        clave: 'test',
        correo: '',
        estado: true,
      };

      const app = new App([UserController]);
      return request(app.getServer()).put('/usuario/modificar/10').send(data).expect(200);
    });
  });

  describe('[DELETE] /usuario/eliminar/:id', () => {
    it('response statusCode 200 / usuario/eliminar/:id', () => {
      const app = new App([UserController]);
      return request(app.getServer()).delete('/usuario/eliminar/9').expect(200);
    });
  });

  describe('[PATCH] /profesor/aprobacion/:id', () => {
    it('response statusCode 200 / profesor/aprobacion/:id', () => {
      const app = new App([UserController]);
      return request(app.getServer()).patch('/profesor/aprobacion/8').expect(200);
    });
  });

  describe('[PATCH] /usuario/cambiar-estado/:id/:estado', () => {
    it('response statusCode 200 / usuario/cambiar-estado/:id/:estado', () => {
      const app = new App([UserController]);
      return request(app.getServer()).patch('/usuario/cambiar-estado/8/false').expect(200);
    });
  });

  describe('[POST] /cambio_clave/:id', () => {
    const app = new App([UserController]);
    return request(app.getServer()).post('/cambio_clave/10').send({ clave: '12345' }).expect(200);
  });
});
