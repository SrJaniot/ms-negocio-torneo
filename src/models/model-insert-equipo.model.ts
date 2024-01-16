import {Model, model, property} from '@loopback/repository';

@model()
export class ModelInsertEquipo extends Model {
  @property({
    type: 'string',
    required: true,
  })
  nomEquipo: string;

  @property({
    type: 'string',
    required: true,
  })
  descEquipo: string;

  @property({
    type: 'string',
    required: true,
  })
  fotoEquipo: string;

  @property({
    type: 'number',
    required: true,
  })
  liderEquipo: number;

  @property({
    type: 'number',
    required: true,
  })
  idGame: number;


  constructor(data?: Partial<ModelInsertEquipo>) {
    super(data);
  }
}

export interface ModelInsertEquipoRelations {
  // describe navigational properties here
}

export type ModelInsertEquipoWithRelations = ModelInsertEquipo & ModelInsertEquipoRelations;
