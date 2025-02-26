import { Container } from 'inversify';
import { AntColonyAlgorithm } from 'src/application/algorithms/ant-colony.algorithm';
import { ConfigService } from 'src/application/services/config.service';
import { RouteService } from 'src/application/services/route.service';
import { PathFindingAlgorithmInterface } from 'src/domain/interfaces/algorithms/path-finding-algorithm.interface';
import { EdgeRepositoryInterface } from 'src/domain/interfaces/repositories/edge-repository.interface';
import { NodeRepositoryInterface } from 'src/domain/interfaces/repositories/node-repository.interface';
import { ConfigServiceInterface } from 'src/domain/interfaces/services/config-service.interface';
import { RouteServiceInterface } from 'src/domain/interfaces/services/route-service.interface';
import {EdgeMapperProfile} from "src/application/mappers/edge-mapper.profile";
import {NodeMapperProfile} from "src/application/mappers/node-mapper.profile";

export function registerApplicationDependencies(container: Container) {
  container
    .bind<ConfigServiceInterface>('ConfigServiceInterface')
    .to(ConfigService);

	container
		.bind<NodeMapperProfile>('NodeMapperProfile')
		.to(NodeMapperProfile);

	container
		.bind<EdgeMapperProfile>('EdgeMapperProfile')
		.to(EdgeMapperProfile);

	container
		.bind<PathFindingAlgorithmInterface>('PathFindingAlgorithmInterface')
		.to(AntColonyAlgorithm);

  container
    .bind<RouteServiceInterface>('RouteServiceInterface')
    .toDynamicValue((context) => {
      const nodeRepo = context.container.get<NodeRepositoryInterface>(
        'NodeRepositoryInterface',
      );
      const edgeRepo = context.container.get<EdgeRepositoryInterface>(
        'EdgeRepositoryInterface',
      );
      const pathfindingAlgorithm =
        context.container.get<PathFindingAlgorithmInterface>(
          'PathFindingAlgorithmInterface',
        );
      return new RouteService(nodeRepo, edgeRepo, pathfindingAlgorithm);
    })
    .inSingletonScope();
}
