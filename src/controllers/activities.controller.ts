import { ActivitiesService } from "@/services/activities.service";
import { Controller, Delete, Get, Post, Put, Req, Res } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import Container from "typedi";

@Controller()
export class ActivitiesController {
    public activity = Container.get(ActivitiesService);
    fs = require('fs-extra');
    cloudinary = require('cloudinary');
    // public path = '/activities'
    
    constructor(){
        this.cloudinary.config({
            cloud_name: 'dj86hmqil',
            api_key: '622768815493224',
            api_secret: '1e80pHQ9aT3ea-bOd_irltBWlNY'
        });
    }
  
    //Se obtiene las actividades por medio de varios restricciones
    @Post("/actividades/obtener")
    @OpenAPI(
        {
            summary: 'Se obtiene las actividades por medio de varios restricciones'
        }
    )
    async obtenerActividades (@Req() req, @Res() res){
        try {
            const { modulo, lenguaje, tipo, usuario } = req.body;
            let datos = await this.activity.obtenerActividades(modulo, lenguaje, tipo, usuario);
            if (datos != null) {
                return datos;
            }
            else
                return { mensaje: "vacio", estado: "0" };
        }
        catch (error) {
            console.log(error);
            return { mensaje: "vacio", estado: "0" };

        }
    }


    // Se envían los datos para registrar la actividad y su nota correspondiente
    @Post("/actividades/resolver")
    @OpenAPI(
        {
            summary: 'Se envían los datos para registrar la actividad y su nota correspondiente'
        }
    )
     async resolverActividad (@Req() req, @Res() res){
        try {

            const { usuario, id_actividad, fecha, minutos, intentos, num_actividad, puntaje } = req.body;
            if (usuario != null) {
                let datos = await this.activity.resolverActividad(usuario, id_actividad, fecha, minutos, intentos, num_actividad, puntaje);
                return { estado: datos };

            }
            else
                return { mensaje: "Usuario desconectado", estado: "0" };
        }
        catch (error) {
            console.log(error);
            return { estado: "0" };

        }
    }

    //Se inserta una nueva actividad a la base de datos
    @Post("/admin/actividades/agregar")
    @OpenAPI(
        {
            summary: 'Se inserta una nueva actividad a la base de datos'
        }
    )
     async agregarActividad (@Req() req, @Res() res) {
        try {
            const { tema, pregunta, opcion_correcta, opcion2, opcion3, opcion4, tipo } = req.body;
            let status, _pregunta, _opcion1;
            switch (tipo) {
                case "encontrar-error":

                    _pregunta = (await this.cloudinary.v2.uploader.upload(req.files[0].path)).secure_url.trim();

                    _opcion1 = opcion_correcta;
                    break;
                case "pares":
                    _pregunta = (await this.cloudinary.v2.uploader.upload(req.files[0].path)).secure_url.trim();
                    _opcion1 = (await this.cloudinary.v2.uploader.upload(req.files[1].path)).secure_url.trim();
                    break;
                default:
                    _pregunta = pregunta;
                    _opcion1 = opcion_correcta;
                    break;
            }

            status = await this.activity.añadirActividad(
                tema,
                _pregunta,
                _opcion1,
                opcion2,
                opcion3,
                opcion4,
                tipo
            );


            if (req.files != undefined) {
                req.files.forEach(async element => {
                    await this.fs.unlink(element.path);
                });
            }


            return { estado: status };

        }
        catch (error) {
            console.log(error);
            return { estado: "0" };
        }
    }

    // Se inserta un nuevo tema 
    @Post("/admin/temas/agregar")
    @OpenAPI(
        {
            summary: 'Se inserta un nuevo tema '
        }
    )
     async agregarTema (@Req() req, @Res() res) {
        try {
            const { modulo, lenguaje, titulo, concepto } = req.body;
            let status = await this.activity.añadirTema(modulo, lenguaje, titulo, concepto);
            if (status != null)
                return { estado: status };
            else
                return { estado: 0 };
        }
        catch (error) {
            console.log(error);
            return { estado: 0 };
        }
    }

    // Se modifica un tema
    @Put("/admin/temas/modificar")
    @OpenAPI(
        {
            summary: 'Se modifica un tema'
        }
    )
     async modificarTema (@Req() req, @Res() res) {
        try {
            const { id, modulo, lenguaje, titulo, concepto } = req.body;
            let status = await this.activity.modificarTema(id, modulo, lenguaje, titulo, concepto);
            return { estado: status };
        } catch (error) {
            return { estado: "0" };
        }
    }

    // Se modifica una actividad
    @Put("/admin/actividades/modificar")
    @OpenAPI(
        {
            summary: 'Se modifica una actividad'
        }
    )
     async modificarActividad (@Req() req, @Res() res) {
        try {
            const { id, tema, pregunta, opcion_correcta, opcion2, opcion3, opcion4, tipo } = req.body;
            let status = await this.activity.modificarActividad(id, tema, pregunta, opcion_correcta, opcion2, opcion3, opcion4, tipo);
            return { estado: status };
        } catch (error) {
            return { estado: "0" };
        }
    }

    // Se elimina una actividad
    @Delete("/admin/actividades/eliminar/:id")
    @OpenAPI(
        {
            summary: 'Se elimina una actividad'
        }
    )
     async eliminarActividad (@Req() req, @Res() res) {
        try {
            const { id } = req.params;
            let status = await this.activity.eliminarActividad(id);
            return { estado: status };
        } catch (error) {
            return { estado: "0" };
        }
    }

    // Se elimina un tema
    @Delete("/admin/temas/eliminar/:id")
    @OpenAPI(
        {
            summary: 'Se elimina un tema'
        }
    )
     async eliminarTema (@Req() req, @Res() res) {
        try {
            const { id } = req.params;
            let status = await this.activity.eliminarTema(id);
            return { estado: status };
        } catch (error) {
            return { estado: "0" };
        }
    }

    // Se obtiene una la teoría correspondiente al módulo y al lenguaje
    @Post("/temas/obtener")
    @OpenAPI(
        {
            summary: 'Se obtiene una la teoría correspondiente al módulo y al lenguaje'
        }
    )
    async obtenerTemas (@Req() req, @Res() res) {
        try {
            const { modulo, lenguaje } = req.body;
            let datos = await this.activity.obtenerTemas(modulo, lenguaje);
            if (datos != null) {
                return datos;
            }
            else
                return { estado: 0 };
        } catch (error) {
            console.log(error);
            return { estado: 0 };
        }
    }

    // Obtenemos todos los temas registrados
    @Get("/admin/temas/obtener")
    @OpenAPI(
        {
            summary: 'Obtenemos todos los temas registrados'
        }
    )
    async listarTemas (@Req() req, @Res() res) {
        try {
            let datos = await this.activity.listarTemas();
            if (datos != null)
                return datos;
            else
                return { estado: 0 };
        } catch (error) {
            console.log(error);
            return { estado: 0 };
        }
    }
}
