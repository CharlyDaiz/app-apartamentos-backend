import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Apartamento,
  Habitante,
} from '../models';
import {ApartamentoRepository} from '../repositories';

export class ApartamentoHabitanteController {
  constructor(
    @repository(ApartamentoRepository)
    public apartamentoRepository: ApartamentoRepository,
  ) { }

  @get('/apartamentos/{id}/habitante', {
    responses: {
      '200': {
        description: 'Habitante belonging to Apartamento',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Habitante)},
          },
        },
      },
    },
  })
  async getHabitante(
    @param.path.string('id') id: typeof Apartamento.prototype.id,
  ): Promise<Habitante> {
    return this.apartamentoRepository.habitante(id);
  }
}
