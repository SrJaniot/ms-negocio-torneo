// Uncomment these imports to begin using these cool features!
import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {GenericModel, ModelInsertEquipo,} from '../models';
import {inject} from '@loopback/core';
import {get, getModelSchemaRef, param, post, requestBody, response} from '@loopback/rest';
import {SQLConfig} from '../config/sql.config';

// import {inject} from '@loopback/core';


export class EquiposController {
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

//Metodos para el controlador de equipos----------------------------------------------------------------------------------------------------------------------------
/**
 *  Funcion para crear un equipo en la base de datos postgresql-----------------------------------------------------------------------------------------
 * @param equipo
 * @returns id del equipo creado o mensaje de error
 */
  @post('/crearEquipo')
  @response(200, {
    description: 'Equipo model instance',
    content: {'application/json':{
      schema: getModelSchemaRef(ModelInsertEquipo)
    },
  },
  })
  async crearEquipo(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ModelInsertEquipo)
        },
      },
    })
    equipo: ModelInsertEquipo,
  ): Promise<object> {
    try{
    const sql = SQLConfig.crearEquipo;
    const parametros = [
      equipo.nomEquipo,
       equipo.descEquipo,
       equipo.fotoEquipo,
       equipo.liderEquipo,
       equipo.idGame
      ];
    const result = await this.genericRepository.dataSource.execute(sql, parametros);
    //console.log(result);
    //console.log(result[0].fun_insert_equipo.resultado);
    //console.log(result[0].fun_insert_equipo.id_equipo);
    //console.log(result[0].fun_insert_equipo.resultado);

    if(result[0].fun_insert_equipo.resultado ===false){
      return {
        "CODIGO": 2,
        "MENSAJE": "Error al insertar datos  del TORNEO en la funcion de postgres FALSE puede ser por que el juego no existe  o el lider tiene ya equipo creado o el nombre esta duplicado",
        "DATOS": result[0].fun_insert_equipo.resultado
      };
    };
    return {
      "CODIGO": 200,
      "MENSAJE": "equipo creado correctamente",
      "DATOS": result[0].fun_insert_equipo.id_equipo
    };
  }catch(error){
    return {
      "CODIGO": 500,
      "MENSAJE": "Error al insertar datos  del TORNEO en la funcion de postgres ERROR POSTGRES",
      "DATOS": error
    };
  }
}



  //Endpoint para obtener un equipo por id-----------------------------------------------------------------------------------------------------------------------------------------------------------
  @get('/obtenerEquipoPorId/{id}')
  @response(200, {
    description: 'obtener un torneo por id',
    content:{
      'aplication/json':{
        schema: getModelSchemaRef(ModelInsertEquipo),
      },
    },
  })
  async obtenerEQUIPOPorId(
    @param.path.number('id') id: number,
  ):Promise<object>{
    try{
      const sql = SQLConfig.obtenerEquipoPorId;
      const params =[id];
      //console.log(params);
      const result = await this.genericRepository.dataSource.execute(sql, params);
      //console.log(result);
      //console.log(result[0]);
      //console.log(result[0].fun_obtener_torneo_por_id.resultado);
      //console.log(result[0].fun_obtener_torneo_por_id.datos);
      if(result[0] == undefined){
        return {
          "CODIGO": 2,
          "MENSAJE": "Error al obtener datos  del EQUIPO en la funcion de postgres FALSE",
          "DATOS": "NO se enotro el EQUIPO con id "+id
        };
      }
      return {
        "CODIGO": 200,
        "MENSAJE": "EQUIPO obtenido correctamente",
        "DATOS": result[0]
      };
    }catch(error){
      return {
        "CODIGO": 500,
        "MENSAJE": "Error al obtener datos  del EQUIPO en la funcion de postgres ERROR POSTGRES",
        "DATOS": error
      };
    }
  }





   //Endpoint para obtener un equipoFULL por id-----------------------------------------------------------------------------------------------------------------------------------------------------------
   @get('/obtenerEquipoFULLPorId/{id}')
   @response(200, {
     description: 'obtener un torneo por id',
     content:{
       'aplication/json':{
         schema: getModelSchemaRef(ModelInsertEquipo),
       },
     },
   })
   async obtenerEQUIPOFULLPorId(
     @param.path.number('id') id: number,
   ):Promise<object>{
     try{
       const sql = SQLConfig.obtenerEquipoFULLPorId;
       const params =[id];
       //console.log(params);
       const result = await this.genericRepository.dataSource.execute(sql, params);
       console.log(result);
       //console.log(result[0]);
       //console.log(result[0].fun_obtener_torneo_por_id.resultado);
       //console.log(result[0].fun_obtener_torneo_por_id.datos);
       if(result[0] == undefined){
         return {
           "CODIGO": 2,
           "MENSAJE": "Error al obtener datos  del EQUIPO en la funcion de postgres FALSE",
           "DATOS": "NO se enotro el EQUIPO con id "+id
         };
       }
       return {
         "CODIGO": 200,
         "MENSAJE": "EQUIPO obtenido correctamente",
         "DATOS": result[0]
       };
     }catch(error){
       return {
         "CODIGO": 500,
         "MENSAJE": "Error al obtener datos  del EQUIPO en la funcion de postgres ERROR POSTGRES",
         "DATOS": error
       };
     }
   }













}
