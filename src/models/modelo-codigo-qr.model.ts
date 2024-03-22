import {Model, model, property} from '@loopback/repository';

@model()
export class ModeloCodigoQr extends Model {
  @property({
    type: 'number',
    required: true,
  })
  id_datos_personales: number;

  @property({
    type: 'number',
    required: true,
  })
  id_evento: number;

  @property({
    type: 'string',
    required: true,
  })
  hash_validacion: string;


  constructor(data?: Partial<ModeloCodigoQr>) {
    super(data);
  }
}

export interface ModeloCodigoQrRelations {
  // describe navigational properties here
}

export type ModeloCodigoQrWithRelations = ModeloCodigoQr & ModeloCodigoQrRelations;
