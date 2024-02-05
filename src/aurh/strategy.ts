// esta estrategia la saque de loopback 4  https://loopback.io/doc/en/lb4/Implement-your-own-strategy.html
// instalar npm i @loopback/authentication, npm i @loopback/security, npm i parse-bearer-token
import {AuthenticationStrategy} from '@loopback/authentication';
import {AuthenticationBindings} from '@loopback/authentication/dist/keys';
import {AuthenticationMetadata} from '@loopback/authentication/src/types';
import {config, inject} from '@loopback/core';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import parseBearerToken from 'parse-bearer-token';
import {ConfiguracionSeguridad} from '../config/configuracion.seguridad';


// AGREGAMOS EL PAQUETE NODE FETCH EN SU VERCION 2  npm i node-fetch@2.7.0 ESTO PARA HACER PETICIONES HTTP ES DECIR PODER CONECTARSE CON
// EL OTRO MICROSERVICIO DE SEGURIDAD
const fetch = require('node-fetch');


export class AuthStrategy implements AuthenticationStrategy {
  //nombre de la estrategia
  name: string = 'auth';

  constructor(

    @inject(AuthenticationBindings.METADATA)
    private metadata:AuthenticationMetadata[],

  ) {}

  /**
   * Autenticación de un usuario frente a una acción en la base de datos
   * @param request la solicitud con el token
   * @returns el perfil de usuario, undefined cuando no tiene permiso o un httpError
   */
  async authenticate(request: Request): Promise<UserProfile | undefined> {
    let token = parseBearerToken(request);

    if (token) {
      let idMenu: string = this.metadata[0].options![0];
      let accion: string = this.metadata[0].options![1];
      //console.log(this.metadata);
      //console.log(token);

      const datos = {token: token, idMenu: idMenu, accion: accion};
      const urlValidarPermisos = `${ConfiguracionSeguridad.hostSeguridad}/validar-permisos`;
      let res = undefined;
      try {
        await fetch(urlValidarPermisos, {
          method: 'post',
          body: JSON.stringify(datos),
          headers: {'Content-Type': 'application/json'},
        }).then((res: any) => res.json())
          .then((json: any) => {
            res = json;
            //console.log(res)
            //console.log(res.permitido)

          });
        if (res!.permitido === 'OK') {

          let perfil: UserProfile = Object.assign({
            permitido: "OK"
          });
          return perfil;
        } else {
          console.log("ERROR TOKEN NO VALIDO");
          return undefined;
        }
      } catch (e) {
        throw new HttpErrors[401]("No se tiene permisos sobre la acción a ejecutar.");
      }
    }
    throw new HttpErrors[401]("No es posible ejecutar la acción por falta de un token.");
  }
}
