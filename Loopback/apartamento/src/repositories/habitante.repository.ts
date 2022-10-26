import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Habitante, HabitanteRelations, Apartamento} from '../models';
import {ApartamentoRepository} from './apartamento.repository';

export class HabitanteRepository extends DefaultCrudRepository<
  Habitante,
  typeof Habitante.prototype.id,
  HabitanteRelations
> {

  public readonly apartamentos: HasManyRepositoryFactory<Apartamento, typeof Habitante.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ApartamentoRepository') protected apartamentoRepositoryGetter: Getter<ApartamentoRepository>,
  ) {
    super(Habitante, dataSource);
    this.apartamentos = this.createHasManyRepositoryFactoryFor('apartamentos', apartamentoRepositoryGetter,);
    this.registerInclusionResolver('apartamentos', this.apartamentos.inclusionResolver);
  }
}
