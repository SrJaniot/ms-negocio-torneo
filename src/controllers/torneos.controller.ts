// Uncomment these imports to begin using these cool features!

import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {GenericModel, ModelInsertTorneo} from '../models';
import {inject} from '@loopback/core';
import {get, getModelSchemaRef, param, post, requestBody, response} from '@loopback/rest';
import {SQLConfig} from '../config/sql.config';

// import {inject} from '@loopback/core';


export class TorneosController {
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


  //Metodos para el controlador de torneos
  //Metodo para crear un torneo-----------------------------------------------------------------------------------------------------------------------------------------------------------

  @post('/crearTorneo')
  @response(200, {
    description: 'creacion de un torneo',
    content:{
      'aplication/json':{
        schema: getModelSchemaRef(ModelInsertTorneo),
      },
    },
  })
  async crearTorneo(
    @requestBody({
      content:{
        'aplication/json':{
          schema: getModelSchemaRef(ModelInsertTorneo),
        },
      },
    })
    data: ModelInsertTorneo,
  ):Promise<object>{
    try{
      //const sql =SQLConfig.crearTorneo;
      // EN ESTE CASO ESTA FUNCION RETORNA UN JSON DESDE POSTGRES
      const sql = SQLConfig.crearTorneo;
      const params =[
        data.nom_torneo,
        data.desc_torneo,
        data.fecha_inicio_torneo,
        data.fecha_fin_torneo,
        data.foto_torneo,
        data.premio_torneo_1,
        data.premio_torneo_2,
        data.premio_torneo_3,
        data.video_explica_torneo,
        data.cantidad_equipos,
        data.valor_dinero_torneo,
        data.id_game,
      ];
      const result = await this.genericRepository.dataSource.execute(sql, params);
      //console.log(result[0]);
      //console.log(result[0].fun_insert_torneo.resultado);
      //console.log(result[0].fun_insert_torneo.id_torneo);
      if(result[0].fun_insert_torneo.resultado ===false){
        return {
          "CODIGO": 2,
          "MENSAJE": "Error al insertar datos  del TORNEO en la funcion de postgres FALSE",
          "DATOS": result[0].fun_insert_torneo.resultado
        };
      }
      return {
        "CODIGO": 200,
        "MENSAJE": "Torneo creado correctamente",
        "DATOS": result[0].fun_insert_torneo.id_torneo
      };
    }catch(error){
      return {
        "CODIGO": 500,
        "MENSAJE": "Error al insertar datos  del TORNEO en la funcion de postgres ERROR POSTGRES",
        "DATOS": error
      };
    }
  }


  //Endpoint para obtener un torneo por id-----------------------------------------------------------------------------------------------------------------------------------------------------------
  @get('/obtenerTorneoPorId/{id}')
  @response(200, {
    description: 'obtener un torneo por id',
    content:{
      'aplication/json':{
        schema: getModelSchemaRef(ModelInsertTorneo),
      },
    },
  })
  async obtenerTorneoPorId(
    @param.path.number('id') id: number,
  ):Promise<object>{
    try{
      const sql = SQLConfig.obtenerTorneoPorId;
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
          "MENSAJE": "Error al obtener datos  del TORNEO en la funcion de postgres FALSE",
          "DATOS": "NO se enotro el torneo con id "+id
        };
      }
      return {
        "CODIGO": 200,
        "MENSAJE": "Torneo obtenido correctamente",
        "DATOS": result[0]
      };
    }catch(error){
      return {
        "CODIGO": 500,
        "MENSAJE": "Error al obtener datos  del TORNEO en la funcion de postgres ERROR POSTGRES",
        "DATOS": error
      };
    }
  }



  //Metodo para obtener todos los torneos-----------------------------------------------------------------------------------------------------------------------------------------------------------
  @get('/obtenerTorneos')
  @response(200, {
    description: 'obtener un torneo por id',
    content:{
      'aplication/json':{
        schema:{
          type: 'array',
          items: getModelSchemaRef(ModelInsertTorneo),
        },
      },
    },
  })
  async obtenerTorneos(
  ):Promise<object>{
    try{
      const sql = SQLConfig.obtenerTorneos;
      //console.log(params);
      const result = await this.genericRepository.dataSource.execute(sql);
      //(console.log(result);
      //console.log(result[0]);
      //console.log(result[0].fun_obtener_torneo_por_id.resultado);
      //console.log(result[0].fun_obtener_torneo_por_id.datos);
      if(result == undefined){
        return {
          "CODIGO": 2,
          "MENSAJE": "Error al obtener datos  del TORNEO en la funcion de postgres FALSE",
          "DATOS": "NO se enotro el torneo con id "
        };
      }
      return {
        "CODIGO": 200,
        "MENSAJE": "Torneo obtenido correctamente",
        "DATOS": result
      };
    }catch(error){
      return {
        "CODIGO": 500,
        "MENSAJE": "Error al obtener datos  del TORNEO en la funcion de postgres ERROR POSTGRES",
        "DATOS": error
      };
    }
  }


  //Metodo para obtener todos los torneos con estado 1 inscribirse-----------------------------------------------------------------------------------------------------------------------------------------------------------

  @get('/obtenerTorneosActivos')
  @response(200, {
    description: 'obtener un torneo por id',
    content:{
      'aplication/json':{
        schema:{
          type: 'array',
          items: getModelSchemaRef(ModelInsertTorneo),
        },
      },
    },
  })
  async obtenerTorneosConID1(
  ):Promise<object>{
    try{
      const sql = SQLConfig.obtenerTorneosActivos;
      //console.log(params);
      const result = await this.genericRepository.dataSource.execute(sql);
      //console.log(result);
      //console.log(result[0]);
      //console.log(result[0].fun_obtener_torneo_por_id.resultado);
      //console.log(result[0].fun_obtener_torneo_por_id.datos);
      if(result == undefined){
        return {
          "CODIGO": 2,
          "MENSAJE": "Error al obtener datos  del TORNEO en la funcion de postgres FALSE",
          "DATOS": "NO se enotro el torneo con id "
        };
      }
      return {
        "CODIGO": 200,
        "MENSAJE": "Torneo obtenido correctamente",
        "DATOS": result
      };
    }catch(error){
      return {
        "CODIGO": 500,
        "MENSAJE": "Error al obtener datos  del TORNEO en la funcion de postgres ERROR POSTGRES",
        "DATOS": error
      };
    }
  }

    //Metodo para obtener todos los torneos con estado 2 en juego-----------------------------------------------------------------------------------------------------------------------------------------------------------

    @get('/obtenerTorneosEnJuego')
    @response(200, {
      description: 'obtener un torneo por id',
      content:{
        'aplication/json':{
          schema:{
            type: 'array',
            items: getModelSchemaRef(ModelInsertTorneo),
          },
        },
      },
    })
    async obtenerTorneosConID2(
    ):Promise<object>{
      try{
        const sql = SQLConfig.obtenerTorneosEnJuego;
        //console.log(params);
        const result = await this.genericRepository.dataSource.execute(sql);
        //console.log(result);
        //console.log(result[0]);
        //console.log(result[0].fun_obtener_torneo_por_id.resultado);
        //console.log(result[0].fun_obtener_torneo_por_id.datos);
        if(result == undefined){
          return {
            "CODIGO": 2,
            "MENSAJE": "Error al obtener datos  del TORNEO en la funcion de postgres FALSE",
            "DATOS": "NO se enotro el torneo con id "
          };
        }
        return {
          "CODIGO": 200,
          "MENSAJE": "Torneo obtenido correctamente",
          "DATOS": result
        };
      }catch(error){
        return {
          "CODIGO": 500,
          "MENSAJE": "Error al obtener datos  del TORNEO en la funcion de postgres ERROR POSTGRES",
          "DATOS": error
        };
      }
    }


//Metodo para obtener todos los torneos con estado 3 FINALIZADO-----------------------------------------------------------------------------------------------------------------------------------------------------------

  @get('/obtenerTorneosfinalizados')
  @response(200, {
    description: 'obtener un torneo por id',
    content:{
      'aplication/json':{
        schema:{
          type: 'array',
          items: getModelSchemaRef(ModelInsertTorneo),
        },
      },
    },
  })
  async obtenerTorneosConID3(
  ):Promise<object>{
    try{
      const sql = SQLConfig.obtenerTorneosFinalizados;
      //console.log(params);
      const result = await this.genericRepository.dataSource.execute(sql);
      //console.log(result);
      //console.log(result[0]);
      //console.log(result[0].fun_obtener_torneo_por_id.resultado);
      //console.log(result[0].fun_obtener_torneo_por_id.datos);
      if(result == undefined){
        return {
          "CODIGO": 2,
          "MENSAJE": "Error al obtener datos  del TORNEO en la funcion de postgres FALSE",
          "DATOS": "NO se enotro el torneo con id "
        };
      }
      return {
        "CODIGO": 200,
        "MENSAJE": "Torneo obtenido correctamente",
        "DATOS": result
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
