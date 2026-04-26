import { Test, TestingModule } from '@nestjs/testing';
import { K6Controller } from './k6.controller';

describe('K6Controller', () => {
  let controller: K6Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [K6Controller],
    }).compile();

    controller = module.get<K6Controller>(K6Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
