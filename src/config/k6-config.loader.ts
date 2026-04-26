import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { ServiceConfig } from './dto/load-config.dto';
import * as fs from 'fs';
import { join } from 'path';

export const loadK6Config = () => {
  const filePath = process.env.K6_CONFIG_PATH || join(process.cwd(), 'load-config.json');
  
  if (!fs.existsSync(filePath)) {
    throw new Error(`Critical Error: Config file not found at ${filePath}`);
  }

  const rawData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const validatedConfig: Record<string, ServiceConfig> = {};

  for (const [serviceName, serviceData] of Object.entries(rawData)) {
    const serviceInstance = plainToInstance(ServiceConfig, serviceData);
    const errors = validateSync(serviceInstance);

    if (errors.length > 0) {
      throw new Error(`Validation failed for ${serviceName}: ${errors.toString()}`);
    }
    validatedConfig[serviceName] = serviceInstance;
  }

  return { k6: validatedConfig };
};