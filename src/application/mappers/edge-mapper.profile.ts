import { MapperProfileInterface } from 'src/application/mappers/mapper-profile.interface';
import { EdgeModel } from 'src/application/models/edge.model';
import { EdgeEntity } from 'src/domain/entities/edge.entity';

export class EdgeMapperProfile
  implements MapperProfileInterface<EdgeModel, EdgeEntity>
{
  toEntity(model: EdgeModel): EdgeEntity;
  toEntity(models: EdgeModel[]): EdgeEntity[];
  toEntity(modelOrModels: EdgeModel | EdgeModel[]): EdgeEntity | EdgeEntity[] {
    if (Array.isArray(modelOrModels)) {
      return modelOrModels.map((model) => this.mapSingleModelToEntity(model));
    } else {
      return this.mapSingleModelToEntity(modelOrModels);
    }
  }

  toModel(entity: EdgeEntity): EdgeModel;
  toModel(entities: EdgeEntity[]): EdgeModel[];
  toModel(
    entityOrEntities: EdgeEntity | EdgeEntity[],
  ): EdgeModel | EdgeModel[] {
    if (Array.isArray(entityOrEntities)) {
      return entityOrEntities.map((entity) =>
        this.mapSingleEntityToModel(entity),
      );
    } else {
      return this.mapSingleEntityToModel(entityOrEntities);
    }
  }

  private mapSingleModelToEntity(model: EdgeModel): EdgeEntity {
    return new EdgeEntity(model.start_node, model.end_node, model.distance);
  }

  private mapSingleEntityToModel(entity: EdgeEntity): EdgeModel {
    return new EdgeModel(entity.startNode, entity.endNode, entity.distance);
  }
}
