import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Torre, TorreRelations} from '../models';

export class TorreRepository extends DefaultCrudRepository<
  Torre,
  typeof Torre.prototype.id,
  TorreRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Torre, dataSource);
  }
}
