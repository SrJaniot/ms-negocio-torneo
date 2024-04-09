// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';

import {inject, service} from '@loopback/core';
import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {GenericModel, ModelInsertEvento, ModelRegistrarUsuarioEvento} from '../models';
import {get, getModelSchemaRef, param, post, requestBody, response} from '@loopback/rest';
import {SQLConfig} from '../config/sql.config';
import {ConfiguracionSeguridad} from '../config/configuracion.seguridad';
import {WhatsappService} from '../services';

// import {inject} from '@loopback/core';

  //variable par hacer llamados fetch a otros servicios
  const fetch = require('node-fetch');


export class WhatsappController {
  //Generacion de un repositorio generico para conectarme a la base de datos postgresql
  private genericRepository: DefaultCrudRepository <GenericModel, typeof GenericModel.prototype.id>;

  constructor(
    // inyectar el datasource de postgresql
    @inject('datasources.postgres')
    dataSource:  juggler.DataSource,
    @service(WhatsappService)
    public WhatsappService: WhatsappService,

  ) {
    //configuracion del genericRepository para que se conecte a la base de datos postgresql
     this.genericRepository = new DefaultCrudRepository<any,any>(
     GenericModel,
      dataSource
     );

  }


  //metodo para mandar un mensaje de whatsapp
  // parametro de entrada: phone, mensaje
  @post('/lead')
  @response(200, {
    description: 'Mensaje enviado'
  })
  async sendMessage(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              phone: {type: 'string'},
              mensaje: {type: 'string'}
            }
          }
        }
      }
    }) data: {phone: string, mensaje: string}
  ): Promise<any> {
    let datosWhatsapp = {
      message: data.mensaje,
      phone: data.phone
    }
    let urlWhatsapp = ConfiguracionSeguridad.urlWhatsappLEAD;
    this.WhatsappService.EnviarMensajeWhatsapp(datosWhatsapp,urlWhatsapp);

  }




  //metodo para mandar un mensaje de whatsapp
  // parametro de entrada: phone, mensaje
  @post('/mensaje-con-archivo')
  @response(200, {
    description: 'Mensaje enviado'
  })
  async sendMessage2(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              phone: {type: 'string'},
              mensaje: {type: 'string'},
              mediaUrl: {type: 'string'}
            }
          }
        }
      }
    }) data: {phone: string, mensaje: string, mediaUrl: string}
  ): Promise<any> {
    let datosWhatsapp = {
      message: data.mensaje,
      phone: data.phone,
      mediaUrl: data.mediaUrl
    }
    let urlWhatsapp = ConfiguracionSeguridad.urlWhatsappMensajeArchivo;
    this.WhatsappService.EnviarMensajeWhatsapp(datosWhatsapp,urlWhatsapp);

  }





}
