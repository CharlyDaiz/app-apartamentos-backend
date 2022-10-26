import {Entity, model, property, hasMany} from '@loopback/repository';
import {Apartamento} from './apartamento.model';

@model()
export class Habitante extends Entity {
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
  Nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  Apellido: string;

  @property({
    type: 'string',
    required: true,
  })
  Correo: string;

  @property({
    type: 'string',
    required: true,
  })
  Celular: string;

  @property({
    type: 'string',
    required: true,
  })
  Clave: string;

  @hasMany(() => Apartamento)
  apartamentos: Apartamento[];

  constructor(data?: Partial<Habitante>) {
    super(data);
  }
}

export interface HabitanteRelations {
  // describe navigational properties here
}

export type HabitanteWithRelations = Habitante & HabitanteRelations;
