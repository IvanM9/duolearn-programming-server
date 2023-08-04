import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  public usuario: string;

  @IsString()
  public clave: string;
}
