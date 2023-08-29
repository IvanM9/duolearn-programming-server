import { API_KEY, API_SECRET, CLOUD_NAME } from '@/config';
import { ActivitiesService } from '@/services/activities.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, Put, QueryParam, Req } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import Container from 'typedi';
import { AddLanguageDto, NewActivityDto, NewTopicDto, ResolveActivitiesDto, UpdateActivityDto, UpdateTopicDto } from '@dtos/activities.dto';
import { ActivityType } from '@/enums/activity-type.enum';

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
  @Get('/actividades/obtener/:modulo/:activo')
  @OpenAPI({
    summary: 'Se obtiene las actividades por medio de varios restricciones',
  })
  async obtenerActividades(@Param('modulo') modulo: number, @Param('activo') activo: boolean) {
    try {
      const datos = await this.activity.obtenerActividades(modulo, activo);
      if (datos != null) {
        return datos;
      } else return { mensaje: 'vacio', estado: '0' };
    } catch (error) {
      console.log(error);
      return { mensaje: 'vacio', estado: '0' };
    }
  }

  //Se obtiene las actividades por medio de varios restricciones
  @Get('/actividades/obtener/all')
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
  @Post('/actividades/resolver/:usuarioId')
  @OpenAPI({
    summary: 'Se envían los datos para registrar la actividad y su nota correspondiente',
  })
  async resolverActividad(@Body() body: ResolveActivitiesDto, @Param('usuarioId') usuarioId: number) {
    try {
      const isSaved = await this.activity.resolverActividad(
        usuarioId,
        body.id_actividad,
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
      let _pregunta, _opcion1;
      switch (tipo) {
        case ActivityType.BUGS:
          _pregunta = (await this.cloudinary.v2.uploader.upload(req.files[0].path)).secure_url.trim();

          _opcion1 = opcion_correcta;
          break;
        case ActivityType.PAIR:
          _pregunta = (await this.cloudinary.v2.uploader.upload(req.files[0].path)).secure_url.trim();
          _opcion1 = (await this.cloudinary.v2.uploader.upload(req.files[1].path)).secure_url.trim();
          break;
        default:
          _pregunta = pregunta;
          _opcion1 = opcion_correcta;
          break;
      }

      const status = await this.activity.añadirActividad(tema, _pregunta, _opcion1, opcion2, opcion3, opcion4, tipo);

      await this.deleteLocalFiles(req.files);

      return { estado: status };
    } catch (error) {
      console.log(error);
      return { estado: '0' };
    }
  }

  private async deleteLocalFiles(files) {
    if (files != undefined) {
      for (const element of files) {
        await this.fs.unlink(element.path);
      }
    }
  }

  @Post('/admin/lenguaje/agregar')
  @OpenAPI({ summary: 'Se inserta un nuevo lenguaje' })
  async agregarLenguaje(@Body() body: AddLanguageDto, @Req() req) {
    try {
      const { titulo, descripcion } = body;
      let portada;
      if (req.files.length != 0) {
        portada = (await this.cloudinary.v2.uploader.upload(req.files[0].path)).secure_url.trim();
      } else {
        portada = '';
      }
      const status = await this.activity.agregarLenguaje(titulo, descripcion, portada);

      await this.deleteLocalFiles(req.files);

      return { estado: status };
    } catch (error) {
      console.log(error);
      return { estado: '0' };
    }
  }

  @Patch('/admin/lenguaje/modificar/:id')
  @OpenAPI({ summary: 'Se modifica un lenguaje' })
  async modificarLenguaje(@Body() body: AddLanguageDto, @Param('id') id: number, @Req() req) {
    try {
      const { titulo, descripcion } = body;
      let portada;
      if (req.files.length != 0) {
        portada = (await this.cloudinary.v2.uploader.upload(req.files[0].path)).secure_url.trim();
      } else {
        portada = '';
      }
      const status = await this.activity.modificarLenguaje(id, titulo, descripcion, portada);

      await this.deleteLocalFiles(req.files);

      return { estado: status };
    } catch (error) {
      console.log(error);
      return { estado: '0' };
    }
  }

  // Se modifica un tema
  @Put('/admin/modulo/modificar/:id')
  @OpenAPI({
    summary: 'Se modifica un tema',
  })
  async modificarTema(@Body() body: UpdateTopicDto, @Param('id') id: number, @Req() req) {
    try {
      let icono;
      if (req.files.length != 0) {
        icono = (await this.cloudinary.v2.uploader.upload(req.files[0].path)).secure_url.trim();
      } else {
        icono = '';
      }
      const status = await this.activity.modificarTema(id, body.titulo, body.concepto, icono);
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
      let _pregunta, _opcion1;
      switch (tipo) {
        case ActivityType.BUGS:
          if (req.files.length != 0) {
            _pregunta = (await this.cloudinary.v2.uploader.upload(req.files[0].path)).secure_url.trim();
          } else {
            _pregunta = pregunta;
          }
          _opcion1 = opcion_correcta;
          break;
        case ActivityType.PAIR:
          if (req.files.length != 0) {
            _pregunta = (await this.cloudinary.v2.uploader.upload(req.files[0].path)).secure_url.trim();
            _opcion1 = (await this.cloudinary.v2.uploader.upload(req.files[1].path)).secure_url.trim();
          } else {
            _pregunta = pregunta;
            _opcion1 = opcion_correcta;
          }
          break;
        default:
          _pregunta = pregunta;
          _opcion1 = opcion_correcta;
          break;
      }

      const status = await this.activity.modificarActividad(id, tema, _pregunta, _opcion1, opcion2, opcion3, opcion4, tipo);

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

  // Se obtienen las actividades sin resolver de un usuario en un modulo basado en un tipo de pregunta
  @Get('/actividades/obtener/:usuario/:modulo/:tipo')
  @OpenAPI({
    summary: 'Se obtienen las actividades sin resolver de un usuario en un modulo basado en un tipo de pregunta',
  })
  async obtenerActividadesSinResolver(@Param('usuario') usuario: number, @Param('modulo') modulo: number, @Param('tipo') tipo: string) {
    try {
      const datos = await this.activity.obtenerActividadesNoResueltas(usuario, modulo, tipo);
      if (datos != null) {
        return datos;
      } else return { estado: 0 };
    } catch (error) {
      console.log(error);
      return { estado: 0 };
    }
  }

  // Se obtienen los modulos correspondientes al lenguaje
  @Get('/modulo/obtener/:id')
  @OpenAPI({
    summary: 'Se obtienen los modulos correspondientes al lenguaje',
  })
  async obtenerTemas(@Param('id') id: number, @QueryParam('activo') activo: boolean) {
    try {
      const datos = await this.activity.obtenerTemas(id, activo);
      if (datos != null) {
        return datos;
      } else return { estado: 0 };
    } catch (error) {
      console.log(error);
      return { estado: 0 };
    }
  }

  // Se obtienen los modulos correspondientes al lenguaje
  @Get('/modulo/:id')
  @OpenAPI({
    summary: 'Se obtienen la información de un determinado modulo',
  })
  async obtenerTemaPorId(@Param('id') id: number) {
    try {
      const datos = await this.activity.obtenerModuloPorId(id);
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

  // Obtenemos todos los lenguajes
  @Get('/admin/lenguajes/obtener')
  @OpenAPI({
    summary: 'Obtenemos todos los lenguajes registrados',
  })
  async listarLenguajes() {
    try {
      const datos = await this.activity.listarLenguajes();
      if (datos != null) return datos;
      else return { estado: 0 };
    } catch (error) {
      console.log(error);
      return { estado: 0 };
    }
  }

  // Obtenemos todos los lenguajes
  @Get('/admin/lenguajes/obtener/:id')
  @OpenAPI({
    summary: 'Obtenemos info de un determinado lenguaje',
  })
  async obtenerLenguajeId(@Param('id') id: number) {
    try {
      const datos = await this.activity.obtenerLenguajePorId(id);
      if (datos != null) return datos;
      else return { estado: 0 };
    } catch (error) {
      console.log(error);
      return { estado: 0 };
    }
  }

  @Patch('/admin/modulo/cambiar-estado/:id/:estado')
  @OpenAPI({ summary: 'Se cambia el estado de un módulo' })
  async cambiarEstadoModulo(@Param('id') id: number, @Param('estado') estado: boolean) {
    try {
      const status = await this.activity.cambiarEstadoModulo(id, estado);
      return { estado: status };
    } catch (error) {
      return { estado: '0' };
    }
  }

  @Patch('/admin/actividades/cambiar-estado/:id/:estado')
  @OpenAPI({ summary: 'Se cambia el estado de una actividad' })
  async cambiarEstadoActividad(@Param('id') id: number, @Param('estado') estado: boolean) {
    try {
      const status = await this.activity.cambiarEstadoActividad(id, estado);
      return { estado: status };
    } catch (error) {
      return { estado: '0' };
    }
  }

  @Patch('/admin/lenguaje/cambiar-estado/:id/:estado')
  @OpenAPI({ summary: 'Se cambia el estado de un lenguaje' })
  async cambiarEstadoLenguaje(@Param('id') id: number, @Param('estado') estado: boolean) {
    try {
      const status = await this.activity.cambiarEstadoLenguaje(id, estado);
      return { estado: status };
    } catch (error) {
      return { estado: '0' };
    }
  }

  @Post('/admin/modulo/agregar/:lenguajeId')
  @OpenAPI({ summary: 'Se agrega un nuevo módulo' })
  async agregarModulo(@Body() body: NewTopicDto, @Param('lenguajeId') lenguajeId: number, @Req() req) {
    try {
      const { titulo, concepto } = body;
      let icono;
      if (req.files.length != 0) {
        icono = (await this.cloudinary.v2.uploader.upload(req.files[0].path)).secure_url.trim();
      } else {
        icono = '';
      }
      const status = await this.activity.agregarModulo(lenguajeId, titulo, concepto, icono);

      await this.deleteLocalFiles(req.files);

      return { estado: status };
    } catch (error) {
      console.log(error);
      return { estado: '0' };
    }
  }
}
