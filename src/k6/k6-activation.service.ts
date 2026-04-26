import { Injectable, Logger } from '@nestjs/common';
import { spawn } from 'child_process';
import { resolve } from 'path';
import { TestRun } from './schemas/test-run.schema';

@Injectable()
export class K6ActivationService {
  private readonly logger = new Logger(K6ActivationService.name);

  async executeTest(testRun: TestRun): Promise<{ exitCode: number | null; output: string }> {
    const scriptPath = resolve(process.cwd(), 'scripts', 'generic.js');
    const isWindows = process.platform === 'win32';
    const k6Env = {
      ...process.env,
      LOAD_CONFIG: JSON.stringify(testRun.loadConfig),
      TARGET_URL: testRun.url,
      REQUEST_CONFIG: JSON.stringify(testRun.requestConfig || { method: 'GET' }),
    };

    return new Promise((resolveExecution) => {
      const k6 = spawn('k6', ['run', scriptPath], {
        shell: isWindows,
        env: k6Env,
      });

      let output = '';
      k6.stdout.on('data', (data) => {
        output += data.toString();
      });
      k6.stderr.on('data', (data) => this.logger.warn(data.toString()));

      k6.on('close', (code) => {
        resolveExecution({ exitCode: code, output });
      });
    });
  }
}
