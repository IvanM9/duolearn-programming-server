import { Controller, Body, Get, Post, Delete, Res, Req, Put } from 'routing-controllers';
import { Container } from 'typedi';
import { CreateUserDto } from '@dtos/users.dto';
import { UserService } from '@services/users.service';
import { Response } from 'express';
const jwt = require('jsonwebtoken');

@Controller()
export class UserController {
  public user = Container.get(UserService);
  //Configuración para el envío de correos
  // const client_id = "670624648440-p8o6pnd7pan6cfi8922goq645pr9nnds.apps.googleusercontent.com";
  // const client_secret = "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";

  @Get('/admin/usuarios/listar')
  async listarUsuarios() {
    try {
      return await this.user.listarUsuarios();
    } catch (error) {
      console.log(error);
      return { estado: 0 };
    }
  }

  //Se obtiene los datos del usuario
  @Get('/usuario/datos/:usuario')
  async getUsuario(@Req() req) {
    try {
      const { usuario } = req.params;

      if (usuario != null) {
        const datos = await this.user.getUser(usuario);
        if (datos != null) {
          datos.estado = '1';
          return datos;
        } else return { estado: '0' };
      } else return { estado: '0' };
    } catch (error) {
      console.error();
      return { estado: 0 };
    }
  }

  //Se verifica que los datos no estén vacios y
  //se obtienen una verificación de que son correctos

  @Post('/iniciar_sesion')
  async iniciarSesion(@Req() req) {
    try {
      const { usuario, clave } = req.body;

      if (usuario.length > 0 && clave.length > 0) {
        const datos = await this.user.inciarSesion(usuario, clave);
        if (datos !== 0 && datos !== null) {
          return { mensaje: 'Sesion iniciada', estado: '1' };
        } else return { mensaje: 'Ingreso fallido', estado: '0' };
      } else return { mensaje: 'campos vacios', estado: '0' };
    } catch (error) {
      console.log(error);
      return { estado: 0 };
    }
  }

  //Se obtienen todos los datos y luego se reemplaza con los valores actuales
  @Put('/usuario/modificar')
  async modificarUsuario(@Req() req) {
    try {
      const { usuario } = req.body;
      if (usuario != null) {
        const { nombres, apellidos, correo, fecha_nacimiento } = req.body;
        const status = await this.user.modificarUser(usuario, nombres, apellidos, correo, fecha_nacimiento);
        console.log(status);
        if (status === 1) return { mensaje: 'Modificado con exito', estado: '1' };
        else return { mensaje: 'Modificación fallida ', estado: '0' };
      } else return { mensaje: 'El usuario no ha iniciado la sesión ', estado: '0' };
    } catch (error) {
      return { mensaje: 'Error: ' + error, estado: '0' };
    }
  }

  //Se registra un nuevo usuario
  @Post('/usuario/nuevo')
  async nuevoUsuario(@Body() data: CreateUserDto, @Res() res: Response) {
    try {
      const { usuario, nombres, apellidos, correo, clave, fecha_nacimiento } = data;
      const status = await this.user.registrarUser(usuario, nombres, apellidos, correo, clave, fecha_nacimiento);

      if (status == 1) {
        return { mensaje: 'Registro correcto', estado: '1' };
      } else return { mensaje: 'Registro fallido', estado: '0' };
    } catch (error) {
      console.log(error);
      return { estado: 0 };
    }
  }

  //Se elimina un usuario
  @Delete('/usuario/eliminar/:usuario')
  async elimnarUsuario(@Req() req, @Res() res) {
    try {
      const usuario = req.params.usuario;
      if (usuario != null) {
        const status = await this.user.eliminarUser(usuario);
        if (status === 1) {
          return { mensaje: 'Eliminado con éxito ', estado: '1' };
        } else return { mensaje: 'Eliminación fallido ', estado: '0' };
      } else res.json({ mensaje: 'El sesión no está iniciada', estado: '0' });
    } catch (error) {
      console.log(error);
      res.json({ estado: 0 });
    }
  }

  //Se envía un correo con una token temporal
  //  solicitarClave = async (req, res) => {
  //   try {
  //       const { usuario } = req.params;
  //       if (usuario != null) {

  //           let link = await crearToken(usuario);
  //           // console.log(link);
  //           const access_Token = await oAuth2.getAccessToken();
  //            var transporter = nodemailer.createTransport({
  //              service: 'gmail',
  //           //     auth: {
  //           //         type: "OAuth2",
  //           //         user: "doulearnp@gmail.com",
  //           //         clientId: client_id,
  //           //         clientSecret: client_secret,
  //           //         refreshToken: "1//04n86mQeX3n5DCgYIARAAGAQSNwF-L9IrCtx-PWfdSOO-2xscnPX1wJ7jTMKRvRDoSc4NMP6NGQsYO3Odt9qXLG9J5zfN5N95U-0",
  //           //         accessToken: access_Token
  //           //     },
  //           // });

  //           let datos = await Usuario.getUser(usuario);
  //           var mailOptions = {
  //               from: "'Duolearn Admin' <doulearnp@gmail.com>",
  //               to: datos.correo,
  //               subject: "Reseteo de su clave duolearn",
  //               text: "link de reseteo de su clave: " + link
  //           };

  //           await transporter.sendMail(mailOptions, function (error, info) {
  //               if (error) {
  //                   console.log(error);
  //               } else {
  //                   console.log('Email enviado: ' + info.response);
  //               }
  //           });
  //           res.json({ estado: "1" });
  //       }
  //       else
  //           res.json({ estado: "0" });
  //   }
  //   catch (error) {
  //       console.log(error);
  //       res.json({ estado: 0 });
  //   }
  // }

  // Se genera un nuevo token para el cambio de contraseña
  //  private crearToken = async (usuario) => {
  //   try {
  //       let resetToken = jwt.sign({ username: usuario }, "studentreset", { expiresIn: '10m' });
  //       await Usuario.asignarToken(usuario, resetToken);
  //       return "http://localhost:4200/olvide-contrasenia/" + resetToken

  //   } catch (error) {
  //       return null;
  //   }
  // }

  // Se ingresa nueva clave y se hace la verificación del token
  @Post('/resetear_clave')
  async resetearClave(@Req() req, @Res() res) {
    try {
      const { usuario, nueva_clave } = req.body;
      const token = req.headers.reset;

      jwt.verify(token, 'studentreset', async () => {
        await this.user.asignarToken(usuario, null);
      });
      const status = await this.user.resetClave(usuario, nueva_clave, token);
      if (status != null && status != 0) return { mensaje: 'clave cambiada exitosamente', estado: 1 };
      else return { estado: '0' };
    } catch (error) {
      console.log(error);
      res.json({ estado: '0', error });
    }
  }

  //Cambio de clave
  @Post('/cambio_clave')
  async cambiarClave(@Req() req) {
    try {
      const { usuario, clave_actual, clave_nueva } = req.body;
      const status = await this.user.cambiarClave(usuario, clave_actual, clave_nueva);
      if (status === 1) return { estado: '1' };
      else return { estado: '0' };
    } catch (error) {
      console.log(error);
      return { estado: '0' };
    }
  }
}
