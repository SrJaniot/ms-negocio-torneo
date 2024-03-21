import {Model, model, property} from '@loopback/repository';

@model()
export class ModelInsertEquipoTorneo extends Model {
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
  id_lider: number;


  constructor(data?: Partial<ModelInsertEquipoTorneo>) {
    super(data);
  }
}

export interface ModelInsertEquipoTorneoRelations {
  // describe navigational properties here
}

export type ModelInsertEquipoTorneoWithRelations = ModelInsertEquipoTorneo & ModelInsertEquipoTorneoRelations;
