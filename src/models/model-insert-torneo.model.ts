import {Model, model, property} from '@loopback/repository';

@model()
export class ModelInsertTorneo extends Model {
  @property({
    type: 'string',
    required: true,
  })
  nom_torneo: string;

  @property({
    type: 'string',
    required: true,
  })
  desc_torneo: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha_inicio_torneo: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha_fin_torneo: string;

  @property({
    type: 'string',
    required: true,
  })
  foto_torneo: string;

  @property({
    type: 'string',
    required: true,
  })
  premio_torneo_1: string;

  @property({
    type: 'string',
    required: true,
  })
  premio_torneo_2: string;

  @property({
    type: 'string',
    required: true,
  })
  premio_torneo_3: string;

  @property({
    type: 'string',
    required: true,
  })
  video_explica_torneo: string;

  @property({
    type: 'number',
    required: true,
  })
  cantidad_equipos: number;

  @property({
    type: 'number',
    required: true,
  })
  valor_dinero_torneo: number;

  @property({
    type: 'number',
    required: true,
  })
  id_game: number;


  constructor(data?: Partial<ModelInsertTorneo>) {
    super(data);
  }
}

export interface ModelInsertTorneoRelations {
  // describe navigational properties here
}

export type ModelInsertTorneoWithRelations = ModelInsertTorneo & ModelInsertTorneoRelations;
