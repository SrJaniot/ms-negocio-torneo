import {Model, model, property} from '@loopback/repository';

@model()
export class ModelRegistrarEquipoTorneo extends Model {
  @property({
    type: 'number',
    required: true,
  })
  id_equipo: number;

  @property({
    type: 'number',
    required: true,
  })
  id_torneo: number;

  @property({
    type: 'number',
    required: true,
  })
  id_liderEquipo: number;


  constructor(data?: Partial<ModelRegistrarEquipoTorneo>) {
    super(data);
  }
}

export interface ModelRegistrarEquipoTorneoRelations {
  // describe navigational properties here
}

export type ModelRegistrarEquipoTorneoWithRelations = ModelRegistrarEquipoTorneo & ModelRegistrarEquipoTorneoRelations;
