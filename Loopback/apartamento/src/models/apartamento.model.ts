import {Entity, model, property, belongsTo, hasOne} from '@loopback/repository';
import {Habitante} from './habitante.model';
import {Torre} from './torre.model';

@model()
export class Apartamento extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  Apartamento: string;

  @property({
    type: 'number',
    required: true,
  })
  Cantidad: number;

  @property({
    type: 'number',
    required: true,
  })
  Numero: number;

  @property({
    type: 'string',
    required: true,
  })
  id_Torre: string;

  @property({
    type: 'string',
    required: true,
  })
  ValorCuota: string;

  @belongsTo(() => Habitante)
  habitanteId: string;

  @hasOne(() => Torre)
  torre: Torre;

  constructor(data?: Partial<Apartamento>) {
    super(data);
  }
}

export interface ApartamentoRelations {
  // describe navigational properties here
}

export type ApartamentoWithRelations = Apartamento & ApartamentoRelations;
