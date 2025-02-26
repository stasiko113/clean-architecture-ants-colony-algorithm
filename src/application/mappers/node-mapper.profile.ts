import { MapperProfileInterface } from 'src/application/mappers/mapper-profile.interface';
import { NodeModel } from 'src/application/models/node.model';
import { NodeEntity } from 'src/domain/entities/node.entity';

export class NodeMapperProfile
  implements MapperProfileInterface<NodeModel, NodeEntity>
{
  toEntity(model: NodeModel): NodeEntity;
  toEntity(models: NodeModel[]): NodeEntity[];
  toEntity(modelOrModels: NodeModel | NodeModel[]): NodeEntity | NodeEntity[] {
    if (Array.isArray(modelOrModels)) {
      return modelOrModels.map((model) => this.mapSingleModelToEntity(model));
    } else {
      return this.mapSingleModelToEntity(modelOrModels);
    }
  }

  toModel(entity: NodeEntity): NodeModel;
  toModel(entities: NodeEntity[]): NodeModel[];
  toModel(
    entityOrEntities: NodeEntity | NodeEntity[],
  ): NodeModel | NodeModel[] {
    if (Array.isArray(entityOrEntities)) {
      return entityOrEntities.map((entity) =>
        this.mapSingleEntityToModel(entity),
      );
    } else {
      return this.mapSingleEntityToModel(entityOrEntities);
    }
  }

  private mapSingleModelToEntity(model: NodeModel): NodeEntity {
    return new NodeEntity(model.id, model.lat, model.lon);
  }

  private mapSingleEntityToModel(entity: NodeEntity): NodeModel {
    return new NodeModel(entity.id, entity.lat, entity.lon);
  }
}
