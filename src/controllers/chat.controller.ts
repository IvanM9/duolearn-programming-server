import { ChatService } from '@/services/chat.service';
import { Controller, Get, Post, Req } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import Container from 'typedi';

@Controller()
export class ChatController {
  service = Container.get(ChatService);

  @Post('/chat/nuevo')
  @OpenAPI({ summary: 'Nuevo mensaje' })
  async nuevoMensaje(@Req() req) {
    try {
      const { usuario, mensaje, fecha } = req.body;
      const status = await this.service.nuevoMensaje(usuario, mensaje, fecha);
      if (status != null) return status;
      else return { estado: 0 };
    } catch (error) {
      return { estado: 0 };
    }
  }

  // Se obtiene toda la conversación
  @Get('/chat/obtener')
  @OpenAPI({ summary: 'Se obtiene toda la conversación' })
  async obtenerMensajes() {
    try {
      const datos = await this.service.obtenerMensajes();
      if (datos != null) return datos;
      else return { estado: 0 };
    } catch (error) {
      return { estado: 0 };
    }
  }
}
