// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';
import {inject} from '@loopback/core';
import {get, getModelSchemaRef, param, post, requestBody, response, Response, RestBindings} from '@loopback/rest';
import {SQLConfig} from '../config/sql.config';
import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {GenericModel} from '../models';



export class TiketController {
   //Generacion de un repositorio generico para conectarme a la base de datos postgresql
   private genericRepository: DefaultCrudRepository <GenericModel, typeof GenericModel.prototype.id>;

  constructor(
    // inyectar el datasource de postgresql
    @inject('datasources.postgres') dataSource:  juggler.DataSource,
    @inject(RestBindings.Http.RESPONSE)
    private response: Response
  ) {
    //configuracion del genericRepository para que se conecte a la base de datos postgresql
    this.genericRepository = new DefaultCrudRepository<any,any>(
      GenericModel,
      dataSource
    );
  }


  //funcion que toma el codigo del barcode y lo devuelve en un json
  @post('/ObtenerDatosUsuarioTiketBarcode')
  @response(200, {
    description: 'Tiket model instance',
    content: {'application/json': {schema: getModelSchemaRef(Object)}},
  })
  async find(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              barcode: {
                type: 'string',
              },
            },
          },
        },
      },
    })
    requestBody: { barcode: string },
  ): Promise<Object> {
    try{
    const barcode = requestBody.barcode;
    //fragmenta el barcode en diferentes partes ya que el barcode tiene un formato especifico ejemplo 0'0'abcreed o 0-0-abcreed
    //separando el barcode en partes se puede obtener el id_evento, id_usuario, hash
    const barcodeArray = barcode.split(/[-']/);
    //se obtiene el id_evento
    const id_evento = barcodeArray[0];
    //se obtiene el id_usuario
    const id_usuario = barcodeArray[1];
    //se obtiene el hash
    const hash = barcodeArray[2];
    //se retorna el barcode en un json

    //Llama a la funcion que obtiene los datos del usuario
    const sql = SQLConfig.obtenerDatosUsuarioTiket;
    const params =[
      id_evento,
      id_usuario,
      hash
    ];
    const result = await this.genericRepository.dataSource.execute(sql, params);
      console.log(result);
      console.log(result[0]);
      //console.log(result[0].fun_obtener_torneo_por_id.resultado);
      //console.log(result[0].fun_obtener_torneo_por_id.datos);
      if(result[0].fun_get_jugador_codigo_barras_evento == undefined || result[0].fun_get_jugador_codigo_barras_evento == null){
        return {
          "CODIGO": 2,
          "MENSAJE": "Error al obtener datos  del tiket en la funcion de postgres FALSE",
          "DATOS": "NO se enotro el tiket "
        };
      }
      return {
        "CODIGO": 200,
        "MENSAJE": "tiket obtenido correctamente",
        "DATOS": result[0].fun_get_jugador_codigo_barras_evento
      };
    }catch(error){
      return {
        "CODIGO": 500,
        "MENSAJE": "Error al obtener datos  del TORNEO en la funcion de postgres ERROR POSTGRES",
        "DATOS": error
      };
    }
  }


}
