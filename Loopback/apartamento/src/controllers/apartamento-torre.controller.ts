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
  Apartamento,
  Torre,
} from '../models';
import {ApartamentoRepository} from '../repositories';

export class ApartamentoTorreController {
  constructor(
    @repository(ApartamentoRepository) protected apartamentoRepository: ApartamentoRepository,
  ) { }

  @get('/apartamentos/{id}/torre', {
    responses: {
      '200': {
        description: 'Apartamento has one Torre',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Torre),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Torre>,
  ): Promise<Torre> {
    return this.apartamentoRepository.torre(id).get(filter);
  }

  @post('/apartamentos/{id}/torre', {
    responses: {
      '200': {
        description: 'Apartamento model instance',
        content: {'application/json': {schema: getModelSchemaRef(Torre)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Apartamento.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Torre, {
            title: 'NewTorreInApartamento',
            exclude: ['id'],
            optional: ['apartamentoId']
          }),
        },
      },
    }) torre: Omit<Torre, 'id'>,
  ): Promise<Torre> {
    return this.apartamentoRepository.torre(id).create(torre);
  }

  @patch('/apartamentos/{id}/torre', {
    responses: {
      '200': {
        description: 'Apartamento.Torre PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Torre, {partial: true}),
        },
      },
    })
    torre: Partial<Torre>,
    @param.query.object('where', getWhereSchemaFor(Torre)) where?: Where<Torre>,
  ): Promise<Count> {
    return this.apartamentoRepository.torre(id).patch(torre, where);
  }

  @del('/apartamentos/{id}/torre', {
    responses: {
      '200': {
        description: 'Apartamento.Torre DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Torre)) where?: Where<Torre>,
  ): Promise<Count> {
    return this.apartamentoRepository.torre(id).delete(where);
  }
}
