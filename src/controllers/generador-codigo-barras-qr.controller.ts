// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';


import {get, getModelSchemaRef, param, post, requestBody, Response, RestBindings} from '@loopback/rest';

//para usar el generador de codigos qr se instala el modulo qrcode 'npm install qrcode' y 'npm i --save-dev @types/qrcode'
import * as QRCode from 'qrcode';

//import para usar generador de codigos de barras  'npm install bwip-js'
import {inject} from '@loopback/core';
import * as bwipjs from 'bwip-js';
import {ModeloCodigoQr} from '../models';
//import para usar generador de codigos de barras  'npm install pdfkit' 'npm install --save-dev @types/pdfkit'
import PDFDocument from 'pdfkit';
import * as puppeteer from 'puppeteer';








export class GeneradorCodigoBarrasQrController {
  constructor(
    @inject(RestBindings.Http.RESPONSE)
    private res: Response,
    @inject(RestBindings.Http.RESPONSE)
    private response: Response

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


  @post('/generateQRCodedownload')
async generateQRCode2(@requestBody() data: ModeloCodigoQr): Promise<void> {
  try {
    const qrCodeDataUrl = await QRCode.toDataURL(JSON.stringify(data));

    // Convertir la Data URL a un buffer
    const qrCodeBuffer = Buffer.from(qrCodeDataUrl.split(',')[1], 'base64');

    // Establecer las cabeceras de la respuesta para indicar que se trata de un archivo para descargar
    this.response.type('application/octet-stream');
    this.response.setHeader('Content-Disposition', 'attachment; filename=qrCode.png');

    // Enviar el buffer del código QR como la respuesta
    this.response.send(qrCodeBuffer);
  } catch (err) {
    console.error(err);
    throw new Error('Failed to generate QR code');
  }
}



@post('/generateQRCodePDF')
async generateQRCodePDF(@requestBody() data: ModeloCodigoQr): Promise<void> {
  try {
    const qrCodeDataUrl = await QRCode.toDataURL(JSON.stringify(data));

    // Crear el HTML
    const html = `
      <html>
        <body>
          <h1>Título del Código QR</h1>
          <img src="${qrCodeDataUrl}" width="200" height="200">
        </body>
      </html>
    `;

    // Crear una instancia de Puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Cargar el HTML en la página
    await page.setContent(html);

    // Generar el PDF
    const pdf = await page.pdf({ format: 'A4' });

    // Cerrar Puppeteer
    await browser.close();

    // Establecer las cabeceras de la respuesta para indicar que se trata de un archivo para descargar
    this.response.type('application/pdf');
    this.response.setHeader('Content-Disposition', 'attachment; filename=qrCode.pdf');

    // Enviar el PDF como la respuesta
    this.response.send(pdf);
  } catch (err) {
    console.error(err);
    throw new Error('Failed to generate QR code PDF');
  }
}



@get('/generateQRCodePDF_GET')
async generateQRCodePDF2_GET(
  @param.query.string('id_evento') id_evento: string,
  @param.query.string('id_datos_personales') id_datos_personales: string,
  @param.query.string('hash_validacion') hash_validacion: string,
): Promise<void> {
  try {
    const data = { id_evento,id_datos_personales, hash_validacion };
    const qrCodeDataUrl = await QRCode.toDataURL(JSON.stringify(data));

    // Crear el HTML
    const html = `
      <html>
        <body>
          <h1>Título del Código QR</h1>
          <img src="${qrCodeDataUrl}" width="200" height="200">
        </body>
      </html>
    `;

    // Crear una instancia de Puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Cargar el HTML en la página
    await page.setContent(html);

    // Generar el PDF
    const pdf = await page.pdf({ format: 'A4' });

    // Cerrar Puppeteer
    await browser.close();

    // Establecer las cabeceras de la respuesta para indicar que se trata de un archivo para descargar
    this.response.type('application/pdf');
    this.response.setHeader('Content-Disposition', 'attachment; filename=qrCode.pdf');

    // Enviar el PDF como la respuesta
    this.response.send(pdf);
  } catch (err) {
    console.error(err);
    throw new Error('Failed to generate QR code PDF');
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
      const { id_datos_personales, hash_validacion, id_evento } = data;
      const text = `${id_datos_personales}-${id_evento}-${hash_validacion}`; // Formatear la cadena como "i-h"

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


@post('/generateBarcodedownload')
async generateBarcode2(@requestBody() data: ModeloCodigoQr): Promise<void> {
  try {
    const { id_datos_personales, hash_validacion, id_evento } = data;
    const text = `${id_datos_personales}-${id_evento}-${hash_validacion}`; // Formatear la cadena como "i-h"

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

    // Establecer las cabeceras de la respuesta para indicar que se trata de un archivo para descargar
    this.response.type('application/octet-stream');
    this.response.setHeader('Content-Disposition', 'attachment; filename=barcode.png');

    // Enviar el buffer del código de barras como la respuesta
    this.response.send(barcodeBuffer);
  } catch (err) {
    console.error(err);
    throw new Error('Error al generar el código de barras');
  }
}

@post('/generateBarcodedownloadPDF')
async generateBarcode2pdf(@requestBody() data: ModeloCodigoQr): Promise<void> {
  try {
    const { id_datos_personales, hash_validacion, id_evento } = data;
    const text = `${id_datos_personales}-${id_evento}-${hash_validacion}`; // Formatear la cadena como "i-h"

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

    // Convertir el buffer del código de barras a una Data URL
    const barcodeDataUrl = `data:image/png;base64,${barcodeBuffer.toString('base64')}`;

    // Crear el HTML
    const html = `
      <html>
        <body>
          <h1>Título del Código de Barras</h1>
          <img src="${barcodeDataUrl}" width="200" height="200">
        </body>
      </html>
    `;

    // Crear una instancia de Puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Cargar el HTML en la página
    await page.setContent(html);

    // Generar el PDF
    const pdf = await page.pdf({ format: 'A4' });

    // Cerrar Puppeteer
    await browser.close();

    // Establecer las cabeceras de la respuesta para indicar que se trata de un archivo para descargar
    this.response.type('application/pdf');
    this.response.setHeader('Content-Disposition', 'attachment; filename=barcode.pdf');

    // Enviar el PDF como la respuesta
    this.response.send(pdf);
  } catch (err) {
    console.error(err);
    throw new Error('Error al generar el código de barras');
  }
}


@get('/generateBarcodedownloadPDF_GET')
async generateBarcode2pdfGET(
  @param.query.string('id_evento') id_evento: string,
  @param.query.string('id_datos_personales') id_datos_personales: string,
  @param.query.string('hash_validacion') hash_validacion: string,
): Promise<void> {
  try {
    const text = `${id_evento}-${id_datos_personales}-${hash_validacion}`; // Formatear la cadena como "i-h"

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

    // Convertir el buffer del código de barras a una Data URL
    const barcodeDataUrl = `data:image/png;base64,${barcodeBuffer.toString('base64')}`;

    // Crear el HTML
    const html = `
      <html>
        <body>
          <h1>Título del Código de Barras</h1>
          <img src="${barcodeDataUrl}" width="200" height="200">
        </body>
      </html>
    `;

    // Crear una instancia de Puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Cargar el HTML en la página
    await page.setContent(html);

    // Generar el PDF
    const pdf = await page.pdf({ format: 'A4' });

    // Cerrar Puppeteer
    await browser.close();

    // Establecer las cabeceras de la respuesta para indicar que se trata de un archivo para descargar
    this.response.type('application/pdf');
    this.response.setHeader('Content-Disposition', 'attachment; filename=barcode.pdf');

    // Enviar el PDF como la respuesta
    this.response.send(pdf);
  } catch (err) {
    console.error(err);
    throw new Error('Error al generar el código de barras');
  }
}

}







