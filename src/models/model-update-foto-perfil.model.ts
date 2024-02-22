import {Model, model, property} from '@loopback/repository';

@model()
export class ModelUpdateFotoPerfil extends Model {
  @property({
    type: 'number',
    required: true,
  })
  id_jugador: number;

  @property({
    type: 'string',
    required: true,
  })
  url_Foto: string;

  @property({
    type: 'string',
    required: true,
  })
  token: string;




  constructor(data?: Partial<ModelUpdateFotoPerfil>) {
    super(data);
  }
}

export interface ModelUpdateFotoPerfilRelations {
  // describe navigational properties here
}

export type ModelUpdateFotoPerfilWithRelations = ModelUpdateFotoPerfil & ModelUpdateFotoPerfilRelations;
