import { IsNumber, IsString, IsArray, ValidateNested, IsOptional, Matches, IsDefined } from 'class-validator';
import { Type } from 'class-transformer';

export class K6Stage {
  @IsString()
  duration: string;

  @IsNumber()
  target: number;
}

export class LoadProfile {
  @IsOptional() @IsNumber()
  vus?: number;

  @IsOptional() @IsString()
  @Matches(/^\d+[smh]$/)
  duration?: string;

  @IsOptional() @IsArray()
  @ValidateNested({ each: true })
  @Type(() => K6Stage)
  stages?: K6Stage[];
}

export class ServiceConfig {
  @ValidateNested() @Type(() => LoadProfile) @IsDefined()
  smoke: LoadProfile;

  @ValidateNested() @Type(() => LoadProfile) @IsDefined()
  spike: LoadProfile;
}