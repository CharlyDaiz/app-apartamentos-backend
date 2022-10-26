import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Habitante,
  Apartamento,
} from '../models';
import {HabitanteRepository} from '../repositories';

export class HabitanteApartamentoController {
  constructor(
    @repository(HabitanteRepository) protected habitanteRepository: HabitanteRepository,
  ) { }

  @get('/habitantes/{id}/apartamentos', {
    responses: {
      '200': {
        description: 'Array of Habitante has many Apartamento',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Apartamento)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Apartamento>,
  ): Promise<Apartamento[]> {
    return this.habitanteRepository.apartamentos(id).find(filter);
  }

  @post('/habitantes/{id}/apartamentos', {
    responses: {
      '200': {
        description: 'Habitante model instance',
        content: {'application/json': {schema: getModelSchemaRef(Apartamento)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Habitante.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Apartamento, {
            title: 'NewApartamentoInHabitante',
            exclude: ['id'],
            optional: ['habitanteId']
          }),
        },
      },
    }) apartamento: Omit<Apartamento, 'id'>,
  ): Promise<Apartamento> {
    return this.habitanteRepository.apartamentos(id).create(apartamento);
  }

  @patch('/habitantes/{id}/apartamentos', {
    responses: {
      '200': {
        description: 'Habitante.Apartamento PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Apartamento, {partial: true}),
        },
      },
    })
    apartamento: Partial<Apartamento>,
    @param.query.object('where', getWhereSchemaFor(Apartamento)) where?: Where<Apartamento>,
  ): Promise<Count> {
    return this.habitanteRepository.apartamentos(id).patch(apartamento, where);
  }

  @del('/habitantes/{id}/apartamentos', {
    responses: {
      '200': {
        description: 'Habitante.Apartamento DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Apartamento)) where?: Where<Apartamento>,
  ): Promise<Count> {
    return this.habitanteRepository.apartamentos(id).delete(where);
  }
}
