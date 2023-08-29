import request from 'supertest';
import { App } from '@/app';
import { ActivitiesController } from '@controllers/activities.controller';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Serivicios de actividades', () => {
  describe('[GET] /actividades/obtener/:modulo/:activo', () => {
    it('response statusCode 200 / actividades/obtener/:modulo/:activo', () => {
      const app = new App([ActivitiesController]);
      return request(app.getServer()).get('/actividades/obtener/1/true').expect(200);
    });
  });

  describe('[GET] /actividades/obtener/all', () => {
    it('response statusCode 200 / actividades/obtener/all', () => {
      const app = new App([ActivitiesController]);
      return request(app.getServer()).get('/actividades/obtener/all').expect(200);
    });
  });

  describe('[GET] /actividades/obtener/:id', () => {
    it('response statusCode 200 / actividades/obtener/:id', () => {
      const app = new App([ActivitiesController]);
      return request(app.getServer()).get('/actividades/obtener/1').expect(200);
    });
  });

  describe('[POST] /actividades/resolver/:usuarioId', () => {
    it('response statusCode 200 / actividades/resolver/:usuarioId', () => {
      const data = {
        actividadId: 1,
        respuesta: 'test',
      };

      const app = new App([ActivitiesController]);
      return request(app.getServer()).post('/actividades/resolver/1').send(data).expect(200);
    });
  });

  describe('[POST] /admin/actividades/agregar', () => {
    it('response statusCode 200 / admin/actividades/agregar', () => {
      const data = {
        nombre: 'test',
        descripcion: 'test',
        modulo: 1,
        estado: true,
      };

      const app = new App([ActivitiesController]);
      return request(app.getServer()).post('/admin/actividades/agregar').send(data).expect(200);
    });
  });

  describe('[POST] /admin/lenguaje/agregar', () => {
    it('response statusCode 200 / admin/lenguaje/agregar', () => {
      const data = {
        actividadId: 1,
        lenguajeId: 1,
      };

      const app = new App([ActivitiesController]);
      return request(app.getServer()).post('/admin/lenguaje/agregar').send(data).expect(200);
    });
  });

  describe('[PATCH] /admin/lenguaje/modificar/:id', () => {
    it('response statusCode 200 / admin/lenguaje/modificar/:id', () => {
      const data = {
        actividadId: 1,
        lenguajeId: 1,
      };

      const app = new App([ActivitiesController]);
      return request(app.getServer()).patch('/admin/lenguaje/modificar/1').send(data).expect(200);
    });
  });

  describe('[PUT] /admin/modulo/modificar/:id', () => {
    it('response statusCode 200 / admin/modulo/modificar/:id', () => {
      const data = {
        nombre: 'test',
        descripcion: 'test',
        estado: true,
      };

      const app = new App([ActivitiesController]);
      return request(app.getServer()).put('/admin/modulo/modificar/1').send(data).expect(200);
    });
  });

  describe('[PUT] /admin/actividades/modificar', () => {
    it('response statusCode 200 / admin/actividades/modificar', () => {
      const data = {
        nombre: 'test',
        descripcion: 'test',
        modulo: 1,
        estado: true,
      };

      const app = new App([ActivitiesController]);
      return request(app.getServer()).put('/admin/actividades/modificar/1').send(data).expect(200);
    });
  });

  describe('[DELETE] /admin/actividades/eliminar/:id', () => {
    it('response statusCode 200 / admin/actividades/eliminar/:id', () => {
      const app = new App([ActivitiesController]);
      return request(app.getServer()).delete('/admin/actividades/eliminar/1').expect(200);
    });
  });

  describe('[DELETE] /admin/temas/eliminar/:id', () => {
    it('response statusCode 200 / admin/temas/eliminar/:id', () => {
      const app = new App([ActivitiesController]);
      return request(app.getServer()).delete('/admin/temas/eliminar/1').expect(200);
    });
  });

  describe('[GET] /actividades/obtener/:usuario/:modulo/:tipo', () => {
    it('response statusCode 200 / actividades/obtener/:usuario/:modulo/:tipo', () => {
      const app = new App([ActivitiesController]);
      return request(app.getServer()).get('/actividades/obtener/1/1/1').expect(200);
    });
  });

  describe('[GET] /modulo/obtener/:id', () => {
    it('response statusCode 200 / modulo/obtener/:id', () => {
      const app = new App([ActivitiesController]);
      return request(app.getServer()).get('/modulo/obtener/1').expect(200);
    });
  });

  describe('[GET] /modulo/:id', () => {
    it('response statusCode 200 / modulo/:id', () => {
      const app = new App([ActivitiesController]);
      return request(app.getServer()).get('/modulo/1').expect(200);
    });
  });

  describe('[GET] /admin/temas/obtener', () => {
    it('response statusCode 200 / admin/temas/obtener', () => {
      const app = new App([ActivitiesController]);
      return request(app.getServer()).get('/admin/temas/obtener').expect(200);
    });
  });

  describe('[GET] /admin/lenguajes/obtener', () => {
    it('response statusCode 200 / admin/lenguajes/obtener', () => {
      const app = new App([ActivitiesController]);
      return request(app.getServer()).get('/admin/lenguajes/obtener').expect(200);
    });
  });

  describe('[GET] /admin/lenguajes/obtener/:id', () => {
    it('response statusCode 200 / admin/lenguajes/obtener/:id', () => {
      const app = new App([ActivitiesController]);
      return request(app.getServer()).get('/admin/lenguajes/obtener/1').expect(200);
    });
  });

  describe('[PATCH] /admin/modulo/cambiar-estado/:id/:estado', () => {
    it('response statusCode 200 / admin/modulo/cambiar-estado/:id/:estado', () => {
      const app = new App([ActivitiesController]);
      return request(app.getServer()).patch('/admin/modulo/cambiar-estado/1/true').expect(200);
    });
  });

  describe('[PATCH] /admin/actividades/cambiar-estado/:id/:estado', () => {
    it('response statusCode 200 / admin/actividades/cambiar-estado/:id/:estado', () => {
      const app = new App([ActivitiesController]);
      return request(app.getServer()).patch('/admin/actividades/cambiar-estado/1/true').expect(200);
    });
  });

  describe('[POST] /admin/modulo/agregar/:lenguajeId', () => {
    it('response statusCode 200 / admin/modulo/agregar/:lenguajeId', () => {
      const data = {
        nombre: 'test',
        descripcion: 'test',
        estado: true,
      };

      const app = new App([ActivitiesController]);
      return request(app.getServer()).post('/admin/modulo/agregar/1').send(data).expect(200);
    });
  });
});
