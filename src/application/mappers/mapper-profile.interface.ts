export interface MapperProfileInterface<M, E> {
	toEntity(model: M | M[]): E | E[];
	toModel(entity: E | E[]): M | M[];
}
