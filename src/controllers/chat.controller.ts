import { ChatService } from "@/services/chat.service";
import { Controller, Get, Post, Req, Res } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import Container from "typedi";

@Controller()
export class ChatController{
    service= Container.get(ChatService);

    @Post("/chat/nuevo")
    @OpenAPI({summary:"Nuevo mensaje"})
    async nuevoMensaje(@Req() req, @Res() res) {
        try {
            const { usuario, mensaje, fecha } = req.body;
            let status = await this.service.nuevoMensaje(usuario, mensaje, fecha);
            if (status != null)
                res.json(status);
            else
                res.json({ estado: 0 });
        } catch (error) {
            res.json({ estado: 0 });
        }
    }
    
    // Se obtiene toda la conversación
    @Get("/chat/obtener")
    @OpenAPI({summary:"Se obtiene toda la conversación"})
    async obtenerMensajes (@Req() req, @Res() res) {
        try {
            let datos = await this.service.obtenerMensajes();
            if (datos != null)
                res.json(datos);
            else
                res.json({ estado: 0 });
        } catch (error) {
            res.json({ estado: 0 });
        }
    }
}