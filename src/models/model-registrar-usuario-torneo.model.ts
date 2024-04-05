import {Model, model, property} from '@loopback/repository';

@model()
export class ModelRegistrarUsuarioTorneo extends Model {
  @property({
    type: 'number',
    required: true,
  })
  id_usuario: number;

  @property({
    type: 'number',
    required: true,
  })
  id_torneo: number;


  constructor(data?: Partial<ModelRegistrarUsuarioTorneo>) {
    super(data);
  }
}

export interface ModelRegistrarUsuarioTorneoRelations {
  // describe navigational properties here
}

export type ModelRegistrarUsuarioTorneoWithRelations = ModelRegistrarUsuarioTorneo & ModelRegistrarUsuarioTorneoRelations;
