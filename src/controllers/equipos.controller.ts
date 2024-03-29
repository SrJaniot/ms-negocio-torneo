// Uncomment these imports to begin using these cool features!
import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {GenericModel, ModelInsertEquipo, ModelInsertEquipoTorneo, VincularJugadorEquipo,} from '../models';
import {inject} from '@loopback/core';
import {get, getModelSchemaRef, param, post, requestBody, response} from '@loopback/rest';
import {SQLConfig} from '../config/sql.config';
import {ConfiguracionSeguridad} from '../config/configuracion.seguridad';
import {authenticate} from '@loopback/authentication';

// import {inject} from '@loopback/core';


const fetch = require('node-fetch');



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
    const urlGenerarHash_100= `${ConfiguracionSeguridad.hostSeguridad}/generar-hash-100`;
    let hash_Equipojson=undefined;
    let hash_Equipo:string="";
        try{
          // Obtén el ID del usuario desde el token llamando al servicio de seguridad con endpoint /obtener-id-postgres
            await fetch (urlGenerarHash_100, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
          }).then((res: any) => res.json())
            .then((json: any) => {
              hash_Equipojson = json;

            });
            hash_Equipo=hash_Equipojson!.hash;

        }
        catch(error){
          return {
            "CODIGO": 500,
            "MENSAJE": "ERROR AL GENERAR EL HASH, PUEDE SER ERROR EN LA CONEXION CON EL SERVICIO DE SEGURIDAD O EL SERVICIO DE SEGURIDAD NO ESTA DISPONIBLE",
            "DATOS": error
          };
        }

    //console.log(hash_Equipojson);
    //imprime el tipo de dato de la variable
    //console.log(typeof hash_Equipojson);

    //console.log(hash_Equipo);
    //console.log(typeof hash_Equipo);
    const parametros = [
      equipo.nomEquipo,
       equipo.descEquipo,
       equipo.fotoEquipo,
       equipo.liderEquipo,
       equipo.idGame,
       hash_Equipo,
      ];
    const result = await this.genericRepository.dataSource.execute(sql, parametros);
    //console.log(result);
    //console.log(result[0].fun_insert_equipo.resultado);
    //console.log(result[0].fun_insert_equipo.id_equipo);
    //console.log(result[0].fun_insert_equipo.resultado);

    if(result[0].fun_insert_equipo.resultado ===false){
      return {
        "CODIGO": 2,
        "MENSAJE": "Error al insertar datos  del equipo en la funcion de postgres FALSE puede ser por que el juego no existe  o el lider tiene ya equipo creado o el nombre esta duplicado",
        "DATOS": result[0].fun_insert_equipo.resultado
      };
    };
    return {
      "CODIGO": 200,
      "MENSAJE": "equipo creado correctamente",
      "DATOS": {
        "idEquipo": result[0].fun_insert_equipo.id_equipo,
        "hashEquipo": hash_Equipo
      }
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
       //console.log(result);
       //console.log(result[0]);
       //console.log(result[0].fun_get_equipofull);
       //console.log(result[0].fun_obtener_torneo_por_id.resultado);
       //console.log(result[0].fun_obtener_torneo_por_id.datos);
       if(result[0].fun_get_equipofull ==  undefined || result[0].fun_get_equipofull == null){
         return {
           "CODIGO": 2,
           "MENSAJE": "Error al obtener datos  del EQUIPO en la funcion de postgres FALSE",
           "DATOS": "NO se encotro el EQUIPO con id "+id
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


   //endponit para vincular un jugador a un equipo por medio de un link -----------------------------------------------------------------------------------------------------------------------------------------------------------
    @authenticate('auth_id_jugador')
    @post('/vincularJugadorEquipo')
    @response(200, {
      description: 'Equipo model instance',
      content: {'application/json':{
        schema: getModelSchemaRef(VincularJugadorEquipo)
      },
    },
    })
    async vincularJugadorEquipo(
      @requestBody({
        content: {
          'application/json': {
            schema: getModelSchemaRef(VincularJugadorEquipo)
          },
        },
      })
      equipo: VincularJugadorEquipo,
    ): Promise<object> {
      try{
      const sql = SQLConfig.vincularJugadorEquipo;
      const parametros = [
        equipo.id_Equipo,
        equipo.Hash_Equipo,
        equipo.Id_jugador
      ];
      const result = await this.genericRepository.dataSource.execute(sql, parametros);
      //console.log(result);
      //console.log(result[0]);
      //console.log(result[0].fun_insert_jugador_equipo_hash);

      if(result[0].fun_insert_jugador_equipo_hash ===false){
        return {
          "CODIGO": 2,
          "MENSJAE": "Error al insertar datos  del equipo en la funcion de postgres FALSE",
          "DATOS": result[0].fun_insert_jugador_equipo_hash
        };
      }
      return {
        "CODIGO": 200,
        "MENSAJE": "equipo creado correctamente",
        "DATOS": result[0].fun_insert_jugador_equipo_hash
      };

    }
      catch(error){
        return {
          "CODIGO": 500,
          "MENSAJE": "Error al insertar datos  del TORNEO en la funcion de postgres ERROR POSTGRES",
          "DATOS": error
        };
      }
    }

    //Endpoint para registrar un equipo en un torneo-----------------------------------------------------------------------------------------------------------------------------------------------------------

    @authenticate('auth_id_jugador')
    @post('/registrarEquipoEnTorneo')
    @response(200, {
      description: 'Equipo model instance',
      content: {'application/json':{
        schema: getModelSchemaRef(ModelInsertEquipoTorneo)
      },
    },
    })
    async registrarEquipoEnTorneo(
      @requestBody({
        content: {
          'application/json': {
            schema: getModelSchemaRef(ModelInsertEquipoTorneo)
          },
        },
      })
      equipo: ModelInsertEquipoTorneo,
    ): Promise<object> {
      try{
      const sql = SQLConfig.registrarEquipoEnTorneo;
      const parametros = [
        equipo.id_equipo,
        equipo.id_torneo,
        equipo.id_lider
      ];
      const result = await this.genericRepository.dataSource.execute(sql, parametros);
      //console.log(result);
      //console.log(result[0]);
      //console.log(result[0].fun_insert_jugador_equipo_hash);

      if(result[0].fun_insert_equipo_torneo ===false){
        return {
          "CODIGO": 2,
          "MENSJAE": "Error al insertar en la funcion de postgres FALSE",
          "DATOS": result[0].fun_insert_equipo_torneo
        };
      }
      return {
        "CODIGO": 200,
        "MENSAJE": "equipo registrado al torneo correctamente",
        "DATOS": result[0].fun_insert_equipo_torneo
      };

    }
      catch(error){
        return {
          "CODIGO": 500,
          "MENSAJE": "Error al insertar datos  del TORNEO en la funcion de postgres ERROR POSTGRES",
          "DATOS": error
        };
      }
    }























}
