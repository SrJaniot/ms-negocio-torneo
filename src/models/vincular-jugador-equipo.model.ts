import {Model, model, property} from '@loopback/repository';

@model()
export class VincularJugadorEquipo extends Model {
  @property({
    type: 'number',
    required: true,
  })
  id_Equipo: number;

  @property({
    type: 'string',
    required: true,
  })
  Hash_Equipo: string;

  @property({
    type: 'number',
    required: true,
  })
  Id_jugador: number;


  constructor(data?: Partial<VincularJugadorEquipo>) {
    super(data);
  }
}

export interface VincularJugadorEquipoRelations {
  // describe navigational properties here
}

export type VincularJugadorEquipoWithRelations = VincularJugadorEquipo & VincularJugadorEquipoRelations;
