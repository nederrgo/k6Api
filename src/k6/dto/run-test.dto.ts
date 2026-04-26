import { IsString, IsOptional, IsIn, IsObject, IsUrl, IsEnum } from 'class-validator';
import { LoadProfile } from '../../config/dto/load-config.dto';
import { testTypes, TestType } from '../../lib/test-types';

export class RunTestDto {
  @IsString()
  service: string;

  @IsEnum(testTypes)
  testType: TestType;

  @IsOptional()
  @IsString()
  @IsUrl()
  url?: string;

  @IsOptional()
  @IsString()
  @IsIn(['GET', 'POST', 'PUT', 'PATCH', 'DELETE'])
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

  @IsOptional()
  @IsObject()
  headers?: Record<string, string>;

  @IsOptional()
  body?: unknown;

  @IsOptional()
  @IsObject()
  load?: LoadProfile;
}
