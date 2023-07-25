import { StadisticsService } from "@/services/stadistics.service";
import { Controller, Get, Req, Res } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import Container from "typedi";

@Controller()
export class StadisticsController {

    service = Container.get(StadisticsService);

    @Get("/usuario/estadisticas_java/:usuario")
    @OpenAPI({summary:"Obtener las estadísticas del módulo Java de un usuario"})
    async getJava(@Req() req, @Res() res) {
        try {
            const usuario = req.params.usuario;
            console.log(usuario);
            let datos = await this.service.getJava(usuario);
            if (datos != null)
                return datos;
            else
                return { menssage: 'error', estado: 0 };
        } catch (error) {
            return { estado: 0 };
        }
    }


    @Get("/usuario/estadisticas_csharp/:usuario")
    @OpenAPI({summary:"Obtener las estadísticas del módulo C# de un usuario"})
    async getCsharp(@Req() req, @Res() res) {
        try {

            const { usuario } = req.params;
            let datos = await this.service.getCsharp(usuario);
            if (datos != null)
                return datos;
            else
                return { menssage: 'error', estado: 0 };
        } catch (error) {
            return { estado: 0 };
        }

    }
}