import {Model, model, property} from '@loopback/repository';

@model()
export class ModelInsertEvento extends Model {

  @property({
    type: 'string',
    required: true,
  })
  nom_evento: string;

  @property({
    type: 'string',
    required: true,
  })
  desc_evento: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha_inicio_evento: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha_fin_evento: string;

  @property({
    type: 'string',
    required: true,
  })
  foto_evento: string;

  @property({
    type: 'string',
    required: true,
  })
  premio_evento_1: string;

  @property({
    type: 'string',
    required: true,
  })
  premio_evento_2: string;

  @property({
    type: 'string',
    required: true,
  })
  premio_evento_3: string;

  @property({
    type: 'string',
    required: true,
  })
  video_explica_evento: string;

  @property({
    type: 'number',
    required: true,
  })
  cantidad_aforo: number;

  @property({
    type: 'number',
    required: true,
  })
  valor_dinero_torneo: number;



  @property({
    type: 'string',
    required: true,
  })
  informacion_general: string;

  @property({
    type: 'string',
    required: true,
  })
  informacion_reglas: string;

  @property({
    type: 'string',
    required: true,
  })
  foto_premio_torneo_1: string;

  @property({
    type: 'string',
    required: true,
  })
  foto_premio_torneo_2: string;

  @property({
    type: 'string',
    required: true,
  })
  foto_premio_torneo_3: string;

  @property({
    type: 'string',
    required: true,
  })
  foto_carta_fondo: string;

  @property({
    type: 'string',
    required: true,
  })
  foto_carta_titulo: string;

  @property({
    type: 'string',
    required: true,
  })
  foto_carta_personaje: string;





  constructor(data?: Partial<ModelInsertEvento>) {
    super(data);
  }
}

export interface ModelInsertEventoRelations {
  // describe navigational properties here
}

export type ModelInsertEventoWithRelations = ModelInsertEvento & ModelInsertEventoRelations;
