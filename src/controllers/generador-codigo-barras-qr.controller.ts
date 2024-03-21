// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';


import {get, getModelSchemaRef, param, post, requestBody, Response, RestBindings} from '@loopback/rest';

//para usar el generador de codigos qr se instala el modulo qrcode 'npm install qrcode' y 'npm i --save-dev @types/qrcode'
import * as QRCode from 'qrcode';

//import para usar generador de codigos de barras  'npm install bwip-js'
import {inject} from '@loopback/core';
import * as bwipjs from 'bwip-js';
import {ModeloCodigoQr} from '../models';




export class GeneradorCodigoBarrasQrController {
  constructor(
    @inject(RestBindings.Http.RESPONSE)
    private res: Response,

  ) {}

  /**
   *  Funcion para generar un codigo QR
   * @param data
   * @returns
   */
  @post('/generateQRCode')
  async generateQRCode(
    @requestBody() data: ModeloCodigoQr,
  ): Promise<string> {
    try {
      const qrCode = await QRCode.toDataURL(JSON.stringify(data));
      return qrCode;
    } catch (err) {
      throw new Error('Failed to generate QR code');
    }
  }


  /**
   * Funcion para generar un codigo de barras
   * @param data
   * @returns
   */
  @post('/generateBarcode')
  async generateBarcode(@requestBody() data: ModeloCodigoQr): Promise<string> {
    try {
      const { id_datos_personales, hash_validacion } = data;
      const text = `${id_datos_personales}-${hash_validacion}`; // Formatear la cadena como "i-h"

      if (!text) {
        throw new Error('Missing text property in request body');
      }

      const barcodeBuffer = await bwipjs.toBuffer({
        bcid: 'code128',
        text,
        scale: 5,
        height: 10,
        includetext: false,
        //textxalign: 'center',
      });

      // Convertir la imagen a una cadena base64
      const base64Image = barcodeBuffer.toString('base64');

      // Crear el elemento de imagen HTML con el enlace de datos
      const imgHtml = `<img src="data:image/png;base64,${base64Image}" alt="Código de barras">`;

      // Devolver el código HTML de la imagen
      return imgHtml;
    } catch (err) {
      console.error(err);
      throw new Error('Error al generar el código de barras');
    }
  }


}







