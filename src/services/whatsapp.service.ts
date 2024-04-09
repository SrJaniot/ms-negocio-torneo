import {injectable, /* inject, */ BindingScope} from '@loopback/core';
const fetch = require('node-fetch');


@injectable({scope: BindingScope.TRANSIENT})
export class WhatsappService {
  constructor(/* Add @inject to inject parameters */) {}

  /*
   * Add service methods here
   */

  EnviarMensajeWhatsapp (datos:any,url:string){
    fetch(url, {
     method: 'post',
     body: JSON.stringify(datos),
     headers: {'Content-Type': 'application/json'},
   })
 }

}
