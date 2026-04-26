import { IsNumber, IsString, IsArray, ValidateNested, IsOptional, Matches, IsObject, IsUrl } from 'class-validator';
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

export class RequestDefaults {
  @IsOptional()
  @IsString()
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

  @IsOptional()
  @IsObject()
  headers?: Record<string, string>;

  @IsOptional()
  body?: unknown;
}

export class TestDefaults {
  @IsUrl()
  url: string;

  @ValidateNested()
  @Type(() => RequestDefaults)
  request: RequestDefaults;

  @ValidateNested()
  @Type(() => LoadProfile)
  load: LoadProfile;
}

export class ServiceConfig {
  @ValidateNested() @Type(() => TestDefaults) @IsOptional()
  smoke?: TestDefaults;

  @ValidateNested() @Type(() => TestDefaults) @IsOptional()
  spike?: TestDefaults;

  @ValidateNested() @Type(() => TestDefaults) @IsOptional()
  soak?: TestDefaults;

  @ValidateNested() @Type(() => TestDefaults) @IsOptional()
  stress?: TestDefaults;

  @ValidateNested() @Type(() => TestDefaults) @IsOptional()
  load?: TestDefaults;

  @ValidateNested() @Type(() => TestDefaults) @IsOptional()
  breakpoint?: TestDefaults;
}