import console from 'node:console';

import { Container } from 'inversify';
import { registerApplicationDependencies } from 'src/application/configuration/infrastructure.container';
import { RouteDto } from 'src/domain/dtos/route.dto';
import { ConsoleInputServiceInterface } from 'src/domain/interfaces/services/console-input-service.interface';
import { RouteServiceInterface } from 'src/domain/interfaces/services/route-service.interface';
import { registerInfrastructureDependencies } from 'src/infrastructure/configuration/infrastructure.container';
import DatabaseContext from 'src/infrastructure/database/database-context';
import { ConsoleInputService } from 'src/presentation/cli/console-input.service';

export const buildContainer = async (): Promise<Container> => {
  const container = new Container();

  registerInfrastructureDependencies(container);
  registerApplicationDependencies(container);

  container
    .bind<ConsoleInputServiceInterface>('ConsoleInputServiceInterface')
    .to(ConsoleInputService)
    .inSingletonScope();

  const consoleInputService = container.get<ConsoleInputServiceInterface>(
    'ConsoleInputServiceInterface',
  );

  const dbConn = container.get<DatabaseContext>(DatabaseContext);
  await dbConn.connect();

  const startLat = parseFloat(
    await consoleInputService.askQuestion('Enter starting latitude: '),
  );
  const startLon = parseFloat(
    await consoleInputService.askQuestion('Enter starting longitude: '),
  );
  const endLat = parseFloat(
    await consoleInputService.askQuestion('Enter destination latitude: '),
  );
  const endLon = parseFloat(
    await consoleInputService.askQuestion('Enter destination longitude: '),
  );

  const routeDto = RouteDto.validate({ startLat, startLon, endLat, endLon });

  const routeService = container.get<RouteServiceInterface>(
    'RouteServiceInterface',
  );

  const path = await routeService.findRoute(routeDto);

  path.map((path) => console.log(`${path.lat},${path.lon}`));

  await dbConn.close();

  return container;
};

buildContainer().catch((e) => console.error(e));
