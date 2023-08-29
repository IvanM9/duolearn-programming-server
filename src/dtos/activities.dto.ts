import { ActivityType } from '@/enums/activity-type.enum';
import { IsEnum, IsNumber, IsNumberString, IsOptional, IsString } from 'class-validator';

export class ResolveActivitiesDto {
  @IsNumber()
  public id_actividad: number;

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
  @IsNumberString()
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

  @IsEnum(ActivityType)
  public tipo: ActivityType;
}

export class UpdateActivityDto extends NewActivityDto {
  @IsNumberString()
  public id: number;
}

export class NewTopicDto {
  @IsString()
  public titulo: string;

  @IsString()
  public concepto: string;
}

export class UpdateTopicDto {
  @IsString()
  public titulo: string;

  @IsString()
  public concepto: string;
}

export class AddLanguageDto {
  @IsString()
  public titulo: string;

  @IsString()
  public descripcion: string;
}
