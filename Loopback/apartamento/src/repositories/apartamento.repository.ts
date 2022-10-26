import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Apartamento, ApartamentoRelations, Habitante, Torre} from '../models';
import {HabitanteRepository} from './habitante.repository';
import {TorreRepository} from './torre.repository';

export class ApartamentoRepository extends DefaultCrudRepository<
  Apartamento,
  typeof Apartamento.prototype.id,
  ApartamentoRelations
> {

  public readonly habitante: BelongsToAccessor<Habitante, typeof Apartamento.prototype.id>;

  public readonly torre: HasOneRepositoryFactory<Torre, typeof Apartamento.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('HabitanteRepository') protected habitanteRepositoryGetter: Getter<HabitanteRepository>, @repository.getter('TorreRepository') protected torreRepositoryGetter: Getter<TorreRepository>,
  ) {
    super(Apartamento, dataSource);
    this.torre = this.createHasOneRepositoryFactoryFor('torre', torreRepositoryGetter);
    this.registerInclusionResolver('torre', this.torre.inclusionResolver);
    this.habitante = this.createBelongsToAccessorFor('habitante', habitanteRepositoryGetter,);
    this.registerInclusionResolver('habitante', this.habitante.inclusionResolver);
  }
}
