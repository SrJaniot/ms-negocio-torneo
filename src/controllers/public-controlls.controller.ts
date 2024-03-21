// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';
// Uncomment these imports to begin using these cool features!
import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {GenericModel} from '../models';
import {inject} from '@loopback/core';
import {get, getModelSchemaRef, param, post, requestBody, response} from '@loopback/rest';
import {SQLConfig} from '../config/sql.config';

// import {inject} from '@loopback/core';


export class PublicControllsController {
  //Generacion de un repositorio generico para conectarme a la base de datos postgresql
  private genericRepository: DefaultCrudRepository <GenericModel, typeof GenericModel.prototype.id>;

  constructor(
    // inyectar el datasource de postgresql
    @inject('datasources.postgres') dataSource:  juggler.DataSource,
  ) {
    //configuracion del genericRepository para que se conecte a la base de datos postgresql
    this.genericRepository = new DefaultCrudRepository<any,any>(
      GenericModel,
      dataSource
    );
  }


  //Metodos para obtener la tabla ciudades----------------------------------------------------------------------------------------------------------------------------
  /**
   * Funcion para obtener la tabla ciudades de la base de datos postgresql-----------------------------------------------------------------------------------------
   * @returns lista de ciudades
   */
  @get('/obtenerCiudades')
  @response(200, {
    description: 'Ciudad model instance',
    content: {'application/json':{
      schema: getModelSchemaRef(GenericModel)
    },
  },
  })
  async obtenerCiudades(): Promise<object> {
    try{
    const sql = SQLConfig.obtenerCiudades;
    const result = await this.genericRepository.dataSource.execute(sql);
    if(result.length === 0){
      return {
        "CODIGO": 404,
        "MENSAJE": "No se encontraron datos",
        "DATOS": result
      };
    }

    return {
      "CODIGO": 200,
      "MENSAJE": "OK",
      "DATOS": result
    };


    }catch(error){
      return error;
    }
  }


  //metodo para obtener la tabla tab_tipodocumento
  /**
   * Funcion para obtener la tabla tab_tipodocumento de la base de datos postgresql-----------------------------------------------------------------------------------------
   * @returns lista de tipos de documentos
   */
    @get('/obtenerTiposDocumentos')
    @response(200, {
      description: 'TipoDocumento model instance',
      content: {'application/json':{
        schema: getModelSchemaRef(GenericModel)
      },
    },
    })
    async obtenerTipoDocumento(): Promise<object> {
      try{
      const sql = SQLConfig.obtenerTipoDocumento;
      const result = await this.genericRepository.dataSource.execute(sql);
      if(result.length === 0){
        return {
          "CODIGO": 404,
          "MENSAJE": "No se encontraron datos",
          "DATOS": result
        };
      }

      return {
        "CODIGO": 200,
        "MENSAJE": "OK",
        "DATOS": result
      };
    }catch(error){
      return error;
    }
  }






}
