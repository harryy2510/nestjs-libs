import { Test, TestingModule } from '@nestjs/testing';
import { NodeResolver } from './node.resolver';
import { NodeService } from './node.service';

describe('NodeResolver', () => {
  let resolver: NodeResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NodeResolver, NodeService],
    }).compile();

    resolver = module.get<NodeResolver>(NodeResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
