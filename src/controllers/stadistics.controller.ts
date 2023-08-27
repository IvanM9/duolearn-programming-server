import { StadisticsService } from '@/services/stadistics.service';
import { Controller, Get, Param } from 'routing-controllers';
import Container from 'typedi';

@Controller()
export class StadisticsController {
  public servcice = Container.get(StadisticsService);

  @Get('/puntajes/:usuario/:modulo')
  async getPuntajesPorModulo(@Param('usuario') usuario: number, @Param('modulo') modulo: number) {
    try {
      const puntajes = await this.servcice.getPuntajesPorModulo(usuario, modulo);
      return puntajes;
    } catch (error) {
      return null;
    }
  }
}
