import { Container } from 'inversify';
import { EdgeRepositoryInterface } from 'src/domain/interfaces/repositories/edge-repository.interface';
import { NodeRepositoryInterface } from 'src/domain/interfaces/repositories/node-repository.interface';
import { ConfigServiceInterface } from 'src/domain/interfaces/services/config-service.interface';
import DatabaseContext from 'src/infrastructure/database/database-context';
import { EdgeRepository } from 'src/infrastructure/repositories/edge.repository';
import { NodeRepository } from 'src/infrastructure/repositories/node.repository';
import {NodeMapperProfile} from "src/application/mappers/node-mapper.profile";
import {EdgeMapperProfile} from "src/application/mappers/edge-mapper.profile";

export function registerInfrastructureDependencies(container: Container) {
  container
    .bind<DatabaseContext>(DatabaseContext)
    .toDynamicValue((context) => {
      const configService = context.container.get<ConfigServiceInterface>(
        'ConfigServiceInterface',
      );
      return new DatabaseContext(configService);
    })
    .inSingletonScope();

  container
    .bind<NodeRepositoryInterface>('NodeRepositoryInterface')
    .toDynamicValue((context) => {
	    const dbConn = context.container.get<DatabaseContext>(DatabaseContext);
	    const mapper = context.container.get<NodeMapperProfile>('NodeMapperProfile');
      return new NodeRepository(dbConn.getClient(), mapper);
    });

  container
    .bind<EdgeRepositoryInterface>('EdgeRepositoryInterface')
    .toDynamicValue((context) => {
      const dbConn = context.container.get<DatabaseContext>(DatabaseContext);
	    const mapper = context.container.get<EdgeMapperProfile>('EdgeMapperProfile');
	    return new EdgeRepository(dbConn.getClient(), mapper);
    });
}
