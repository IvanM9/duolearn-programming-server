import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class GetActivitiesDto {
  @IsNumber()
  public modulo: number;

  @IsString()
  public lenguaje: string;

  @IsString()
  public tipo: string;

  @IsString()
  public usuario: string;
}

export class GetTopicsDto {
  @IsNumber()
  public modulo: number;

  @IsString()
  public lenguaje: string;
}

export class ResolveActivitiesDto {
  @IsString()
  public usuario: string;

  @IsNumber()
  public id_actividad: number;

  @IsDateString()
  public fecha: string;

  @IsNumber()
  public minutos: number;

  @IsNumber()
  public intentos: number;

  @IsNumber()
  public num_actividad: number;

  @IsNumber()
  public puntaje: number;
}

export class NewActivityDto {
  @IsNumber()
  public tema: number;

  @IsString()
  @IsOptional()
  public pregunta: string;

  @IsString()
  @IsOptional()
  public opcion_correcta: string;

  @IsString()
  @IsOptional()
  public opcion2: string;

  @IsString()
  @IsOptional()
  public opcion3: string;

  @IsString()
  @IsOptional()
  public opcion4: string;

  @IsString()
  public tipo: string;
}

export class UpdateActivityDto extends NewActivityDto {
  @IsNumber()
  public id: number;  
}

export class NewTopicDto {
  @IsNumber()
  public modulo: number;

  @IsString()
  public lenguaje: string;

  @IsString()
  public titulo: string;

  @IsString()
  public concepto: string;
}

export class UpdateTopicDto extends NewTopicDto {
  @IsNumber()
  public id: number;
}
