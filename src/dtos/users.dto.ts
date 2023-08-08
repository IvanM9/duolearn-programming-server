import { IsString, IsEmail, Length, IsDateString, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  public usuario: string;

  @IsString()
  public nombres: string;

  @IsString()
  public apellidos: string;

  @IsEmail()
  public correo: string;

  @IsString()
  @Length(6)
  public clave: string;

  @IsDateString()
  @IsOptional()
  public fecha_nacimiento: string;
}

export class UpdateUserDto {
  @IsString()
  public usuario: string;

  @IsString()
  public nombres: string;

  @IsString()
  public apellidos: string;

  @IsEmail()
  public correo: string;

  @IsDateString()
  @IsOptional()
  public fecha_nacimiento: string;
}
