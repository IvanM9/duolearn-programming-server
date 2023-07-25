import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { OpenAPI } from 'routing-controllers-openapi';

export class CreateUserDto {
  @IsString()
  public usuario: string;
  
  @IsString()
  public nombres: string;

  @IsString()
  public apellidos: string;

  @IsString()
  public correo: string;

  @IsString()
  public clave: string;

  @IsString()
  public fecha_nacimiento: string;
}

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(9)
  @MaxLength(32)
  public password: string;
}
