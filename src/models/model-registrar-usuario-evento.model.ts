import {Model, model, property} from '@loopback/repository';

@model()
export class ModelRegistrarUsuarioEvento extends Model {
  @property({
    type: 'number',
    required: true,
  })
  id_evento: number;

  @property({
    type: 'number',
    required: true,
  })
  id_usuario: number;

 

  constructor(data?: Partial<ModelRegistrarUsuarioEvento>) {
    super(data);
  }
}

export interface ModelRegistrarUsuarioEventoRelations {
  // describe navigational properties here
}

export type ModelRegistrarUsuarioEventoWithRelations = ModelRegistrarUsuarioEvento & ModelRegistrarUsuarioEventoRelations;
