import request from 'supertest';
import { App } from '@/app';
import { UserController } from '@controllers/users.controller';
import { CreateUserDto } from '@dtos/users.dto';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Serivicios de usuario', () => {
  describe('[POST] /login', () => {
    it('response statusCode 200 / login', () => {
      const data = {
        usuario: 'admin',
        clave: '12345'
      };

      const app = new App([UserController]);
      return request(app.getServer()).post('/iniciar_sesion').send(data).expect(200);
    });
  });
});
