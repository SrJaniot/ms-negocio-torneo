// Uncomment these imports to begin using these cool features!

import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {GenericModel, ModelInsertEvento, ModelInsertTorneo, ModelRegistrarUsuarioEvento} from '../models';
import {inject} from '@loopback/core';
import {get, getModelSchemaRef, param, post, requestBody, response} from '@loopback/rest';
import {SQLConfig} from '../config/sql.config';
import {authenticate} from '@loopback/authentication';
import {ConfiguracionSeguridad} from '../config/configuracion.seguridad';

// import {inject} from '@loopback/core';

const fetch = require('node-fetch');



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

  @post('/crearevento')
  @response(200, {
    description: 'creacion de un torneo',
    content:{
      'aplication/json':{
        schema: getModelSchemaRef(ModelInsertEvento),
      },
    },
  })
  async crearevento(
    @requestBody({
      content:{
        'aplication/json':{
          schema: getModelSchemaRef(ModelInsertEvento),
        },
      },
    })
    data: ModelInsertEvento,
  ):Promise<object>{
    try{
      //const sql =SQLConfig.crearTorneo;
      // EN ESTE CASO ESTA FUNCION RETORNA UN JSON DESDE POSTGRES
      const sql = SQLConfig.crearEvento;
      const params =[
        data.nom_evento,
        data.desc_evento,
        data.fecha_inicio_evento,
        data.fecha_fin_evento,
        data.foto_evento,
        data.premio_evento_1,
        data.premio_evento_2,
        data.premio_evento_3,
        data.video_explica_evento,
        data.cantidad_aforo,
        data.valor_dinero_torneo,
        data.informacion_general,
        data.informacion_reglas,
        data.foto_premio_torneo_1,
        data.foto_premio_torneo_2,
        data.foto_premio_torneo_3,
        data.foto_carta_fondo,
        data.foto_carta_titulo,
        data.foto_carta_personaje
      ];
      const result = await this.genericRepository.dataSource.execute(sql, params);
      //console.log(result[0]);

      //console.log(result[0]);
      //console.log(result[0].fun_insert_torneo.resultado);
      //console.log(result[0].fun_insert_torneo.id_torneo);
      if(result[0].fun_insert_evento.resultado ===false){
        return {
          "CODIGO": 2,
          "MENSAJE": "Error al insertar datos  del evento en la funcion de postgres FALSE",
          "DATOS": result[0].fun_insert_evento.resultado
        };
      }
      return {
        "CODIGO": 200,
        "MENSAJE": "evento creado correctamente",
        "DATOS": result[0].fun_insert_evento.id_torneo
      };
    }catch(error){
      return {
        "CODIGO": 500,
        "MENSAJE": "Error al insertar datos  del TORNEO en la funcion de postgres ERROR POSTGRES",
        "DATOS": error
      };
    }
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
        data.informacion_general,
        data.informacion_reglas,
        data.foto_premio_torneo_1,
        data.foto_premio_torneo_2,
        data.foto_premio_torneo_3,
        data.foto_carta_fondo,
        data.foto_carta_titulo,
        data.foto_carta_personaje,
        data.id_evento
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
  //autenticacion
  @authenticate({
    strategy: 'auth',
    options:[ConfiguracionSeguridad.menuTorneoID,ConfiguracionSeguridad.listarAccion]
  })

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
      //console.log(result);
      //console.log(result[0]);
      //console.log(result[0].fun_obtener_torneo_por_id.resultado);
      //console.log(result[0].fun_obtener_torneo_por_id.datos);
      if(result[0] == undefined){
        return {
          "CODIGO": 2,
          "MENSAJE": "Error al obtener datos  del TORNEO en la funcion de postgres FALSE",
          "DATOS": "NO se enotro el torneo  "
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
      if(result[0] == undefined){
        return {
          "CODIGO": 2,
          "MENSAJE": "Error al obtener datos  del TORNEO en la funcion de postgres FALSE",
          "DATOS": "NO se enotro el torneo  "
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
        if(result[0] == undefined){
          return {
            "CODIGO": 2,
            "MENSAJE": "Error al obtener datos  del TORNEO en la funcion de postgres FALSE",
            "DATOS": "NO se enotro el torneo  "
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
      if(result[0] == undefined){
        return {
          "CODIGO": 2,
          "MENSAJE": "Error al obtener datos  del TORNEO en la funcion de postgres FALSE",
          "DATOS": "NO se enotro el torneo "
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


  //metodo para registrar la asistencia del usuario al evento-----------------------------------------------------------------------------------------------------------------------------------------------------------
  @post('/registrarAsistenciaEvento')
  @response(200, {
    description: 'registro de asistencia al evento',
    content:{
      'application/json':{
        schema:{
          type: 'array',
          items: getModelSchemaRef(ModelRegistrarUsuarioEvento),
        },
      },
    },
  })
  async registrarAsistenciaEvento(
    @requestBody({
      content:{
        'application/json':{
          schema: getModelSchemaRef(ModelRegistrarUsuarioEvento),
        },
      },
    })
    data: ModelRegistrarUsuarioEvento,
  ):Promise<object>{
    try{
      const sql = SQLConfig.registrarAsistenciaEvento;
      const urlGenerarHash= `${ConfiguracionSeguridad.hostSeguridad}/generar-hash-10`;
      let hash_Equipojson=undefined;
      let hash_Equipo:string="";
      await fetch (urlGenerarHash, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
      }).then((res: any) => res.json())
        .then((json: any) => {
          hash_Equipojson = json;

        });
        hash_Equipo=hash_Equipojson!.hash;
        console.log(hash_Equipo);







      const params =[
        data.id_evento,
        data.id_usuario,
        hash_Equipo
      ];
      const result = await this.genericRepository.dataSource.execute(sql, params);
      //console.log(result[0]);
      //console.log(result[0].fun_insert_torneo.resultado);
      //console.log(result[0].fun_insert_torneo.id_torneo);
      if(result[0].fun_insert_asistencia_evento.resultado ===false){
        return {
          "CODIGO": 2,
          "MENSAJE": "Error al insertar datos  del REGISTRO en la funcion de postgres FALSE",
          "DATOS": result[0].fun_insert_asistencia_evento.resultado
        };
      }
      return {
        "CODIGO": 200,
        "MENSAJE": "REGISTRO creado correctamente",
        "DATOS": hash_Equipo
      };
    }catch(error){
      return {
        "CODIGO": 500,
        "MENSAJE": "Error al insertar datos  del REGISTRO en la funcion de postgres ERROR POSTGRES",
        "DATOS": error
      };
    }
  }











}
