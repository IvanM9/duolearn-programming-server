import { Role } from '@/enums/role.enum';
import { IsString, IsEmail, IsDateString, IsOptional, IsStrongPassword, IsEnum, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsString()
  public usuario: string;

  @IsString()
  public nombres: string;

  @IsString()
  public apellidos: string;

  @IsEmail()
  public correo: string;

  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 0,
  })
  public clave: string;

  @IsDateString({ strict: false })
  @IsOptional()
  public fecha_nacimiento: Date;

  @IsEnum(Role, { message: 'El tipo de usuario no es valido' })
  public tipo: Role;
}

export class UpdateUserDto {
  @IsNumber()
  public usuario_id: number;

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

export class ResetPasswordDto {
  @IsString()
  public usuario: string;

  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 0,
  })
  public nueva_clave: string;
}

export class ChangePasswordDto {
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 0,
  })
  public clave_nueva: string;

  @IsString()
  public clave_actual: string;
}
