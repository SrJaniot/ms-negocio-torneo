// Uncomment these imports to begin using these cool features!
import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {GenericModel, ModelInsertEquipo, ModelUpdateFotoPerfil,} from '../models';
import {inject} from '@loopback/core';
import {get, getModelSchemaRef, param, post, requestBody, response} from '@loopback/rest';
import {SQLConfig} from '../config/sql.config';
import {authenticate} from '@loopback/authentication';
import {ConfiguracionSeguridad} from '../config/configuracion.seguridad';

// import {inject} from '@loopback/core';

const fetch = require('node-fetch');



export class JugadorController {
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

//Metodos para el controlador de jugador----------------------------------------------------------------------------------------------------------------------------

//buscar jugador por id
/**
 *  Funcion para buscar un jugador por id en la base de datos postgresql-----------------------------------------------------------------------------------------
 * @param id
 * @returns jugador
 */
@get('/ObtenerJugador/{id}')
@response(200, {
  description: 'obtener un torneo por id',
  content:{
    'aplication/json':{
      schema: getModelSchemaRef(GenericModel),
    },
  },
})
async obtenerTorneoPorId(
  @param.path.number('id') id: number,
):Promise<object>{
      try{
      //console.log(id);
      const sql = SQLConfig.obtenerJugadorPorId;
      const parametros = [
        id
        ];
      const result = await this.genericRepository.dataSource.execute(sql, parametros);
      //console.log(result);
      // console.log(result.length);
      //console.log(result[0]);
      //console.log(result[0].fun_get_jugador_id_perfil);
      //console.log(result[0][0].id);

      if(result[0].fun_get_jugador_id_perfil === null){
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
      return {
        "CODIGO": 500,
        "MENSAJE": "Error",
        "DATOS": error
      };
    }
  }
  //autenticacion
  //actualizar jugador foto jugador
  /**
   *  Funcion para actualizar la foto de un jugador en la base de datos postgresql-----------------------------------------------------------------------------------------
   * @param id
   * @param foto
   * @returns jugador
   */
  @authenticate('auth_id_jugador')
  @post('/ActualizarFotoJugador')
  @response(200, {
    description: 'actualizar foto de un jugador',
    content:{
      'aplication/json':{
        schema: getModelSchemaRef(GenericModel),
      },
    },
  })
  async actualizarFotoJugador(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ModelUpdateFotoPerfil),
        },
      },
    })
    jugador: ModelUpdateFotoPerfil,
  ):Promise<object>{
    // configuro la url para obtener el id del usuario desde el token
    const urlObtenerIdUsuarioToken= `${ConfiguracionSeguridad.hostSeguridad}/obtener-id-postgres`;
    let idPostgresToken=undefined;
    const datos = {token: jugador.token};
        try{
          // Obtén el ID del usuario desde el token llamando al servicio de seguridad con endpoint /obtener-id-postgres
            await fetch (urlObtenerIdUsuarioToken, {
            method: 'post',
            body: JSON.stringify(datos),
            headers: {'Content-Type': 'application/json'},
          }).then((res: any) => res.json())
            .then((json: any) => {
              idPostgresToken = json;
            });
            //console.log(idPostgresToken);
            //valida que el id del jugador sea el mismo que el id del usuario autenticado gracias a que idPostgresToken es el id del usuario autenticado
            if (jugador.id_jugador != idPostgresToken){
              return {
                "CODIGO": 401,
                "MENSAJE": "No se puede actualizar la foto de un jugador que no es el usuario autenticado",
                "DATOS": "El id del jugador no es el mismo que el id del usuario autenticado"
              };
            }
        //console.log(jugador);
        const sql = SQLConfig.actualizarFotoJugador;
        const parametros = [
          jugador.id_jugador,
          jugador.url_Foto

          ];
        const result = await this.genericRepository.dataSource.execute(sql, parametros);
        //console.log(result);
        // console.log(result.length);
        //console.log(result[0]);
        //console.log(result[0].fun_get_jugador_id_perfil);
        //console.log(result[0][0].id);
        //console.log(result[0].fun_actualizar_foto_jugador);
        if(result[0].fun_actualizar_foto_jugador === false){
          return {
            "CODIGO": 404,
            "MENSAJE": "No se encontraron datos de jugador",
            "DATOS": result
          };
        }

        return {
          "CODIGO": 200,
          "MENSAJE": "OK",
          "DATOS": result
        };
      }catch(error){
        return {
          "CODIGO": 500,
          "MENSAJE": "Error",
          "DATOS": error
        };
      }
    }

    //actualizar jugador foto jugador



}














