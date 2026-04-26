import { Injectable, Logger } from '@nestjs/common';
import { spawn } from 'child_process';
import { resolve } from 'path';
import { TestRun } from './schemas/test-run.schema';
import { readFileSync, unlinkSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';

@Injectable()
export class K6ActivationService {
  private readonly logger = new Logger(K6ActivationService.name);

  async executeTest(testRun: TestRun): Promise<{ exitCode: number | null; output: string }> {
    const scriptPath = resolve(process.cwd(), 'scripts', 'generic.js');
    const summaryPath = join(tmpdir(), `k6-summary-${Date.now()}.json`);
    const isWindows = process.platform === 'win32';
    const k6Env = {
      ...process.env,
      LOAD_CONFIG: JSON.stringify(testRun.loadConfig),
      TARGET_URL: testRun.url,
      REQUEST_CONFIG: JSON.stringify(testRun.requestConfig || { method: 'GET' }),
    };

    return new Promise((resolveExecution) => {
      const k6 = spawn('k6', ['run', '--summary-export', summaryPath, scriptPath], {
        shell: isWindows,
        env: k6Env,
      });

      let output = '';
      k6.stdout.on('data', (data) => {
        output += data.toString();
      });
      k6.stderr.on('data', (data) => this.logger.warn(data.toString()));

      k6.on('close', (code) => {
        let jsonOutput = output;
        try {
          jsonOutput = readFileSync(summaryPath, 'utf-8');
          unlinkSync(summaryPath);
        } catch (error) {
          this.logger.warn(`Could not read summary JSON file: ${String(error)}`);
        }

        resolveExecution({ exitCode: code, output: jsonOutput });
      });
    });
  }
}
