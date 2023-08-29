import { App } from '@/app';
import { StadisticsController } from '@controllers/stadistics.controller';
import request from 'supertest';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Serivicios de estadisticas', () => {
  describe('[GET] /puntajes/:usuario/:modulo', () => {
    it('response statusCode 200 / puntajes/:usuario/:modulo', () => {
      const app = new App([StadisticsController]);
      return request(app.getServer()).get('/puntajes/7/10').expect(200);
    });
  });
});
