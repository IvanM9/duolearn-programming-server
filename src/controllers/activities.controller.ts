import { API_KEY, API_SECRET, CLOUD_NAME } from '@/config';
import { ActivitiesService } from '@/services/activities.service';
import { Body, Controller, Delete, Get, Param, Post, Put, Req } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import Container from 'typedi';
import {
  GetActivitiesDto,
  GetTopicsDto,
  NewActivityDto,
  NewTopicDto,
  ResolveActivitiesDto,
  UpdateActivityDto,
  UpdateTopicDto,
} from '@dtos/activities.dto';

@Controller()
export class ActivitiesController {
  public activity = Container.get(ActivitiesService);
  fs = require('fs-extra');
  cloudinary = require('cloudinary');
  // public path = '/activities'

  constructor() {
    this.cloudinary.config({
      cloud_name: CLOUD_NAME,
      api_key: API_KEY,
      api_secret: API_SECRET,
    });
  }

  //Se obtiene las actividades por medio de varios restricciones
  @Post('/actividades/obtener')
  @OpenAPI({
    summary: 'Se obtiene las actividades por medio de varios restricciones',
  })
  async obtenerActividades(@Body() body: GetActivitiesDto) {
    try {
      const datos = await this.activity.obtenerActividades(body.modulo, body.lenguaje, body.tipo, body.usuario);
      if (datos != null) {
        return datos;
      } else return { mensaje: 'vacio', estado: '0' };
    } catch (error) {
      console.log(error);
      return { mensaje: 'vacio', estado: '0' };
    }
  }


  //Se obtiene las actividades por medio de varios restricciones
  @Get('/actividades/obtener')
  @OpenAPI({
    summary: 'Se obtienem todas las actividades',
  })
  async obtenerActividadesAll() {
    try {
      const datos = await this.activity.obtenerActividadesAll();
      if (datos != null) {
        return datos;
      } else return { mensaje: 'vacio', estado: '0' };
    } catch (error) {
      console.log(error);
      return { mensaje: 'vacio', estado: '0' };
    }
  }


  //Se obtiene las actividades por medio de varios restricciones
  @Get('/actividades/obtener/:id')
  @OpenAPI({
    summary: 'Se obtiene una actividad por id',
  })
  async obtenerActividadId(@Param('id') id: number) {
    try {
      const datos = await this.activity.obtenerActividadId(id);
      if (datos != null) {
        return datos;
      } else return { mensaje: 'vacio', estado: '0' };
    } catch (error) {
      console.log(error);
      return { mensaje: 'vacio', estado: '0' };
    }
  }
  // Se envían los datos para registrar la actividad y su nota correspondiente
  @Post('/actividades/resolver')
  @OpenAPI({
    summary: 'Se envían los datos para registrar la actividad y su nota correspondiente',
  })
  async resolverActividad(@Body() body: ResolveActivitiesDto) {
    try {
      const isSaved = await this.activity.resolverActividad(
        body.usuario,
        body.id_actividad,
        body.fecha,
        body.minutos,
        body.intentos,
        body.num_actividad,
        body.puntaje,
      );
      return { estado: isSaved };
    } catch (error) {
      console.log(error);
      return { estado: '0' };
    }
  }

  //Se inserta una nueva actividad a la base de datos
  @Post('/admin/actividades/agregar')
  @OpenAPI({
    summary: 'Se inserta una nueva actividad a la base de datos',
  })
  async agregarActividad(@Body() body: NewActivityDto, @Req() req) {
    try {
      const { tema, pregunta, opcion_correcta, opcion2, opcion3, opcion4, tipo } = body;
      let status, _pregunta, _opcion1;
      switch (tipo) {
        case 'encontrar-error':
          _pregunta = (await this.cloudinary.v2.uploader.upload(req.files[0].path)).secure_url.trim();

          _opcion1 = opcion_correcta;
          break;
        case 'pares':
          _pregunta = (await this.cloudinary.v2.uploader.upload(req.files[0].path)).secure_url.trim();
          _opcion1 = (await this.cloudinary.v2.uploader.upload(req.files[1].path)).secure_url.trim();
          break;
        default:
          _pregunta = pregunta;
          _opcion1 = opcion_correcta;
          break;
      }

      status = await this.activity.añadirActividad(tema, _pregunta, _opcion1, opcion2, opcion3, opcion4, tipo);

      if (req.files != undefined) {
        for (const element of req.files) {
          await this.fs.unlink(element.path);
        }
      }

      return { estado: status };
    } catch (error) {
      console.log(error);
      return { estado: '0' };
    }
  }

  // Se inserta un nuevo tema
  @Post('/admin/temas/agregar')
  @OpenAPI({
    summary: 'Se inserta un nuevo tema ',
  })
  async agregarTema(@Body() body: NewTopicDto) {
    try {
      const status = await this.activity.añadirTema(body.modulo, body.lenguaje, body.titulo, body.concepto);
      if (status != null) return { estado: status };
      else return { estado: 0 };
    } catch (error) {
      console.log(error);
      return { estado: 0 };
    }
  }

  // Se modifica un tema
  @Put('/admin/temas/modificar')
  @OpenAPI({
    summary: 'Se modifica un tema',
  })
  async modificarTema(@Body() body: UpdateTopicDto) {
    try {
      const status = await this.activity.modificarTema(body.id, body.modulo, body.lenguaje, body.titulo, body.concepto);
      return { estado: status };
    } catch (error) {
      return { estado: '0' };
    }
  }

  // Se modifica una actividad
  @Put('/admin/actividades/modificar')
  @OpenAPI({
    summary: 'Se modifica una actividad',
  })
  async modificarActividad(@Body() body: UpdateActivityDto, @Req() req) {
    try {
      const { id, tema, pregunta, opcion_correcta, opcion2, opcion3, opcion4, tipo } = body;
      let status, _pregunta, _opcion1;
      switch (tipo) {
        case 'encontrar-error':
          if(req.files.length != 0){
            _pregunta = (await this.cloudinary.v2.uploader.upload(req.files[0].path)).secure_url.trim();
          }
          else{
            _pregunta = pregunta
          }
          _opcion1 = opcion_correcta;
          break;
        case 'pares':
          if(req.files.length != 0){
            _pregunta = (await this.cloudinary.v2.uploader.upload(req.files[0].path)).secure_url.trim();
            _opcion1 = (await this.cloudinary.v2.uploader.upload(req.files[1].path)).secure_url.trim();
          }
          else{
            _pregunta = pregunta
            _opcion1 = opcion_correcta;
          }
          break;
        default:
          _pregunta = pregunta;
          _opcion1 = opcion_correcta;
          break;
      }
      status = await this.activity.modificarActividad(id, tema, pregunta, opcion_correcta, opcion2, opcion3, opcion4, tipo);

      if (req.files != undefined) {
        for (const element of req.files) {
          await this.fs.unlink(element.path);
        }
      }

      return { estado: status };
    } catch (error) {
      return { estado: '0' };
    }
  }

  // Se elimina una actividad
  @Delete('/admin/actividades/eliminar/:id')
  @OpenAPI({
    summary: 'Se elimina una actividad',
  })
  async eliminarActividad(@Param('id') id: number) {
    try {
      const status = await this.activity.eliminarActividad(id);
      return { estado: status };
    } catch (error) {
      return { estado: '0' };
    }
  }

  // Se elimina un tema
  @Delete('/admin/temas/eliminar/:id')
  @OpenAPI({
    summary: 'Se elimina un tema',
  })
  async eliminarTema(@Param('id') id: number) {
    try {
      const status = await this.activity.eliminarTema(id);
      return { estado: status };
    } catch (error) {
      return { estado: '0' };
    }
  }

  // Se obtiene una la teoría correspondiente al módulo y al lenguaje
  @Post('/temas/obtener')
  @OpenAPI({
    summary: 'Se obtiene una la teoría correspondiente al módulo y al lenguaje',
  })
  async obtenerTemas(@Body() body: GetTopicsDto) {
    try {
      const datos = await this.activity.obtenerTemas(body.modulo, body.lenguaje);
      if (datos != null) {
        return datos;
      } else return { estado: 0 };
    } catch (error) {
      console.log(error);
      return { estado: 0 };
    }
  }

  // Obtenemos todos los temas registrados
  @Get('/admin/temas/obtener')
  @OpenAPI({
    summary: 'Obtenemos todos los temas registrados',
  })
  async listarTemas() {
    try {
      const datos = await this.activity.listarTemas();
      if (datos != null) return datos;
      else return { estado: 0 };
    } catch (error) {
      console.log(error);
      return { estado: 0 };
    }
  }
}
