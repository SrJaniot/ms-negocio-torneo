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
import { readFile } from 'fs/promises';









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

      <!-- partial:index.partial.html -->
      <div class="container">


        <div class="ticket airline">
          <div class="top">
            <img src="${qrCodeDataUrl}" width="200" height="200">
            <br>
            <p><span>Boleta válida solo para 1 persona</span></p>
            <p>${data.nom_evento}</p>

          </div>

          <div class="bottom">
          <br>

            <div class="column">
              <div class="row row-1">
                <br>
                <p><span>Fecha</span>${data.fecha_evento}</p>
                <p class="row--center"><span>Inicio</span>${data.hora_inicio}</p>
                <p class="row--right"><span>Finaliza</span>${data.hora_fin}</p>

              </div>
              <div class="row row-2">
                <p><span>Usuario</span>${data.nombreDestino}</p>
              </div>
              <div class="row row-3">
                <p> Recuerda: PROHIBIDO uso de bebidas alcohólicas, sustancias psicoactivas o implementos que afecten la salud de los demás </p>

              </div>

        </div>

      </div>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Afacad:ital,wght@0,400..700;1,400..700&display=swap');
      body,
      p,
      h1 {
        margin: 0;
        padding: 0;
        font-family: "Afacad";
      }

      .container {
        background: #e0e2e8;
        position: relative;
        width: 100%;
        height: 100vh;
        color: #fff;
      }
      .container .ticket {
        position: absolute;
        top: 30%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      .ticket .top {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      .ticket .top img {
        margin-top: 50px; /* Ajusta este valor según tus necesidades */
      }

      .container .basic {
        display: none;
      }

      .airline {
        display: block;
        height: 575px;
        width: 270px;
        box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.3);
        border-radius: 25px;
        z-index: 3;
      }
      .airline .top {
        height: 220px;
        background: #fff;
        border-top-right-radius: 25px;
        border-top-left-radius: 25px;
      }
      .airline .top h1 {
        text-transform: uppercase;
        font-size: 10px;
        letter-spacing: 2;
        text-align: center;
        position: absolute;
        top: 30px;
        left: 50%;
        transform: translateX(-50%);
      }
      .airline .bottom {
        height: 355px;

        background-image: url("https://i.postimg.cc/KjrLNJnd/prueba.jpg");
        background-repeat: no-repeat;
        background-size: cover; /* Esto hará que la imagen de fondo cubra todo el div */
        border-bottom-right-radius: 25px;
        border-bottom-left-radius: 25px;
      }

      .top .big {
        position: absolute;
        top: 100px;
        font-size: 65px;
        font-weight: 700;
        line-height: 0.8;
      }
      .top .big .from {
        color: #fff;
        text-shadow: -1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000;
      }
      .top .big .to {
        position: absolute;
        left: 32px;
        font-size: 35px;
        display: flex;
        flex-direction: row;
        align-items: center;
      }
      .top .big .to i {
        margin-top: 5px;
        margin-right: 10px;
        font-size: 15px;
      }
      .top--side {
        position: absolute;
        right: 35px;
        top: 110px;
        text-align: right;
      }
      .top--side i {
        font-size: 25px;
        margin-bottom: 18px;
      }
      .top--side p {
        font-size: 10px;
        font-weight: 700;
      }
      .top--side p + p {
        margin-bottom: 8px;
      }

      .bottom p {
        display: flex;
        flex-direction: column;
        font-size: 13px;
        font-weight: 700;
        color: #fff;
      }
      .bottom p span {
        font-weight: 400;
        font-size: 11px;
        color: #cccccc;
      }
      .bottom .column {
        margin: 0 auto;
        width: 80%;
        padding: 2rem 0;
      }
      .bottom .row {
        display: flex;
        justify-content: space-between;
      }
      .bottom .row--right {
        text-align: right;
      }
      .bottom .row--center {
        text-align: center;
      }
      .bottom .row-2 {
        margin: 30px 0 60px 0;
        position: relative;
      }
      .bottom .row-2::after {
        content: "";
        position: absolute;
        width: 100%;
        bottom: -30px;
        left: 0;
        background: #cccccc;
        height: 1px;
      }


      </style>
    `;

    // Crear una instancia de Puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Cargar el HTML en la página
    await page.setContent(html);

    // Generar el PDF
    const pdf = await page.pdf({ format: 'A4', printBackground: true });

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

  @param.query.string('nombreDestino') nombreDestino: string,


  @param.query.string('nom_evento') nom_evento: string,
  @param.query.string('fecha_evento') fecha_evento: string,
  @param.query.string('hora_inicio') hora_inicio: string,
  @param.query.string('hora_fin') hora_fin: string,

): Promise<void> {
  try {
    const data = { id_evento,id_datos_personales, hash_validacion };
    const qrCodeDataUrl = await QRCode.toDataURL(JSON.stringify(data));







    // Crear el HTML
    const html = `

      <!-- partial:index.partial.html -->
      <div class="container">


        <div class="ticket airline ">
          <div class="top">
            <img src="${qrCodeDataUrl}" width="200" height="200">
            <br>
            <p><span>Boleta válida solo para 1 persona</span></p>
            <p>${nom_evento}</p>
          </div>

          <div class="bottom" >
          <br>

            <div class="column">
              <div class="row row-1">

                <p><span>Fecha</span>${fecha_evento}</p>
                <p class="row--center"><span>Inicio</span>${hora_inicio}</p>
                <p class="row--right"><span>Finaliza</span>${hora_fin}</p>

              </div>
              <div class="row row-2">
                <p><span>Usuario</span>${nombreDestino}</p>
              </div>
              <div class="row row-3">
                <p> Recuerda: PROHIBIDO uso de bebidas alcohólicas, sustancias psicoactivas o implementos que afecten la salud de los demás </p>

              </div>

        </div>

      </div>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Afacad:ital,wght@0,400..700;1,400..700&display=swap');
      body,
      p,
      h1 {
        margin: 0;
        padding: 0;
        font-family: "Afacad";
      }

      .container {
        background: #e0e2e8;
        position: relative;
        width: 100%;
        height: 100vh;
        color: #fff;

      }
      .container .ticket {
        position: absolute;
        top: 30%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      .ticket .top {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      .ticket .top img {
        margin-top: 50px; /* Ajusta este valor según tus necesidades */
      }

      .container .basic {
        display: none;
      }

      .airline {
        display: block;
        height: 575px;
        width: 270px;
        box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.3);
        border-radius: 25px;
        z-index: 3;

      }
      .airline .top {
        height: 220px;
        background: #fff;
        border-top-right-radius: 25px;
        border-top-left-radius: 25px;
      }
      .airline .top h1 {
        text-transform: uppercase;
        font-size: 10px;
        letter-spacing: 2;
        text-align: center;
        position: absolute;
        top: 30px;
        left: 50%;
        transform: translateX(-50%);
      }
      .airline .bottom {
        height: 355px;

        background-image: url("https://i.postimg.cc/KjrLNJnd/prueba.jpg");
        background-repeat: no-repeat;
        background-size: cover; /* Esto hará que la imagen de fondo cubra todo el div */
        border-bottom-right-radius: 25px;
        border-bottom-left-radius: 25px;
      }

      .top .big {
        position: absolute;
        top: 100px;
        font-size: 65px;
        font-weight: 700;
        line-height: 0.8;
      }
      .top .big .from {
        color: #fff;
        text-shadow: -1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000;
      }
      .top .big .to {
        position: absolute;
        left: 32px;
        font-size: 35px;
        display: flex;
        flex-direction: row;
        align-items: center;
      }
      .top .big .to i {
        margin-top: 5px;
        margin-right: 10px;
        font-size: 15px;
      }
      .top--side {
        position: absolute;
        right: 35px;
        top: 110px;
        text-align: right;
      }
      .top--side i {
        font-size: 25px;
        margin-bottom: 18px;
      }
      .top--side p {
        font-size: 10px;
        font-weight: 700;
      }
      .top--side p + p {
        margin-bottom: 8px;
      }

      .bottom p {
        display: flex;
        flex-direction: column;
        font-size: 13px;
        font-weight: 700;
        color: #fff;
      }
      .bottom p span {
        font-weight: 400;
        font-size: 11px;
        color: #cccccc;
      }
      .bottom .column {
        margin: 0 auto;
        width: 80%;
        padding: 2rem 0;
      }
      .bottom .row {
        display: flex;
        justify-content: space-between;
      }
      .bottom .row--right {
        text-align: right;
      }
      .bottom .row--center {
        text-align: center;
      }
      .bottom .row-2 {
        margin: 30px 0 60px 0;
        position: relative;
      }
      .bottom .row-2::after {
        content: "";
        position: absolute;
        width: 100%;
        bottom: -30px;
        left: 0;
        background: #cccccc;
        height: 1px;
      }


      </style>
    `;


    // Crear una instancia de Puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Cargar el HTML en la página
    await page.setContent(html);

    // Generar el PDF
    const pdf = await page.pdf({ format: 'A4', printBackground: true });
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
    const { id_datos_personales, hash_validacion, id_evento,nombreDestino,nom_evento,fecha_evento,hora_inicio,hora_fin } = data;
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

      <!-- partial:index.partial.html -->
      <div class="container">


        <div class="ticket airline">
          <div class="top">
            <h1>¡Registro Exitoso!</h1>
            <img src="${barcodeDataUrl}" width="200" height="200">
            <p><span>Boleta válida solo para 1 persona</span></p>
            <p>${nom_evento}</p>
          </div>

          <div class="bottom">
            <div class="column">
              <div class="row row-1">
                <p><span>Fecha</span>${fecha_evento}</p>
                <p class="row--center"><span>Inicio</span>${hora_inicio}</p>
                <p class="row--right"><span>Finaliza</span>${hora_fin}</p>

              </div>
              <div class="row row-2">
                <p><span>Usuario</span>${nombreDestino}</p>
              </div>
              <div class="row row-3">
                <p> Recuerda: PROHIBIDO uso de bebidas alcohólicas, sustancias psicoactivas o implementos que afecten la salud de los demás </p>

              </div>

        </div>

      </div>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Afacad:ital,wght@0,400..700;1,400..700&display=swap');
      body,
      p,
      h1 {
        margin: 0;
        padding: 0;
        font-family: "Afacad";
      }

      .container {
        background: #e0e2e8;
        position: relative;
        width: 100%;
        height: 100vh;
      }
      .container .ticket {
        position: absolute;
        top: 30%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      .ticket .top {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      .ticket .top img {
        margin-top: 50px; /* Ajusta este valor según tus necesidades */
      }

      .container .basic {
        display: none;
      }

      .airline {
        display: block;
        height: 575px;
        width: 270px;
        box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.3);
        border-radius: 25px;
        z-index: 3;
      }
      .airline .top {
        height: 220px;
        background: #fff;
        border-top-right-radius: 25px;
        border-top-left-radius: 25px;
      }
      .airline .top h1 {
        text-transform: uppercase;
        font-size: 10px;
        letter-spacing: 2;
        text-align: center;
        position: absolute;
        top: 30px;
        left: 50%;
        transform: translateX(-50%);
      }
      .airline .bottom {
        height: 355px;

        background-image: url("https://i.postimg.cc/KjrLNJnd/prueba.jpg");
        background-repeat: no-repeat;
        background-size: cover; /* Esto hará que la imagen de fondo cubra todo el div */
        border-bottom-right-radius: 25px;
        border-bottom-left-radius: 25px;
      }

      .top .big {
        position: absolute;
        top: 100px;
        font-size: 65px;
        font-weight: 700;
        line-height: 0.8;
      }
      .top .big .from {
        color: #fff;
        text-shadow: -1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000;
      }
      .top .big .to {
        position: absolute;
        left: 32px;
        font-size: 35px;
        display: flex;
        flex-direction: row;
        align-items: center;
      }
      .top .big .to i {
        margin-top: 5px;
        margin-right: 10px;
        font-size: 15px;
      }
      .top--side {
        position: absolute;
        right: 35px;
        top: 110px;
        text-align: right;
      }
      .top--side i {
        font-size: 25px;
        margin-bottom: 18px;
      }
      .top--side p {
        font-size: 10px;
        font-weight: 700;
      }
      .top--side p + p {
        margin-bottom: 8px;
      }

      .bottom p {
        display: flex;
        flex-direction: column;
        font-size: 13px;
        font-weight: 700;
        color: #fff;
      }
      .bottom p span {
        font-weight: 400;
        font-size: 11px;
        color: #cccccc;
      }
      .bottom .column {
        margin: 0 auto;
        width: 80%;
        padding: 2rem 0;
      }
      .bottom .row {
        display: flex;
        justify-content: space-between;
      }
      .bottom .row--right {
        text-align: right;
      }
      .bottom .row--center {
        text-align: center;
      }
      .bottom .row-2 {
        margin: 30px 0 60px 0;
        position: relative;
      }
      .bottom .row-2::after {
        content: "";
        position: absolute;
        width: 100%;
        bottom: -30px;
        left: 0;
        background: #cccccc;
        height: 1px;
      }


      </style>
    `;

    // Crear una instancia de Puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Cargar el HTML en la página
    await page.setContent(html);

    // Generar el PDF
    const pdf = await page.pdf({ format: 'A4', printBackground: true });

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

  @param.query.string('nombreDestino') nombreDestino: string,


  @param.query.string('nom_evento') nom_evento: string,
  @param.query.string('fecha_evento') fecha_evento: string,
  @param.query.string('hora_inicio') hora_inicio: string,
  @param.query.string('hora_fin') hora_fin: string,





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

      <!-- partial:index.partial.html -->
      <div class="container">


        <div class="ticket airline">
          <div class="top">
            <h1>¡Registro Exitoso!</h1>
            <img src="${barcodeDataUrl}" width="200" height="200">
            <p><span>Boleta válida solo para 1 persona</span></p>
            <p>${nom_evento}</p>
          </div>

          <div class="bottom">
            <div class="column">
              <div class="row row-1">
                <p><span>Fecha</span>${fecha_evento}</p>
                <p class="row--center"><span>Inicio</span>${hora_inicio}</p>
                <p class="row--right"><span>Finaliza</span>${hora_fin}</p>

              </div>
              <div class="row row-2">
                <p><span>Usuario</span>${nombreDestino}</p>
              </div>
              <div class="row row-3">
                <p> Recuerda: PROHIBIDO uso de bebidas alcohólicas, sustancias psicoactivas o implementos que afecten la salud de los demás </p>

              </div>

        </div>

      </div>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Afacad:ital,wght@0,400..700;1,400..700&display=swap');
      body,
      p,
      h1 {
        margin: 0;
        padding: 0;
        font-family: "Afacad";
      }

      .container {
        background: #e0e2e8;
        position: relative;
        width: 100%;
        height: 100vh;
      }
      .container .ticket {
        position: absolute;
        top: 30%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      .ticket .top {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      .ticket .top img {
        margin-top: 50px; /* Ajusta este valor según tus necesidades */
      }

      .container .basic {
        display: none;
      }

      .airline {
        display: block;
        height: 575px;
        width: 270px;
        box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.3);
        border-radius: 25px;
        z-index: 3;
      }
      .airline .top {
        height: 220px;
        background: #fff;
        border-top-right-radius: 25px;
        border-top-left-radius: 25px;
      }
      .airline .top h1 {
        text-transform: uppercase;
        font-size: 10px;
        letter-spacing: 2;
        text-align: center;
        position: absolute;
        top: 30px;
        left: 50%;
        transform: translateX(-50%);
      }
      .airline .bottom {
        height: 355px;

        background-image: url("https://i.postimg.cc/KjrLNJnd/prueba.jpg");
        background-repeat: no-repeat;
        background-size: cover; /* Esto hará que la imagen de fondo cubra todo el div */
        border-bottom-right-radius: 25px;
        border-bottom-left-radius: 25px;
      }

      .top .big {
        position: absolute;
        top: 100px;
        font-size: 65px;
        font-weight: 700;
        line-height: 0.8;
      }
      .top .big .from {
        color: #fff;
        text-shadow: -1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000;
      }
      .top .big .to {
        position: absolute;
        left: 32px;
        font-size: 35px;
        display: flex;
        flex-direction: row;
        align-items: center;
      }
      .top .big .to i {
        margin-top: 5px;
        margin-right: 10px;
        font-size: 15px;
      }
      .top--side {
        position: absolute;
        right: 35px;
        top: 110px;
        text-align: right;
      }
      .top--side i {
        font-size: 25px;
        margin-bottom: 18px;
      }
      .top--side p {
        font-size: 10px;
        font-weight: 700;
      }
      .top--side p + p {
        margin-bottom: 8px;
      }

      .bottom p {
        display: flex;
        flex-direction: column;
        font-size: 13px;
        font-weight: 700;
        color: #fff;
      }
      .bottom p span {
        font-weight: 400;
        font-size: 11px;
        color: #cccccc;
      }
      .bottom .column {
        margin: 0 auto;
        width: 80%;
        padding: 2rem 0;
      }
      .bottom .row {
        display: flex;
        justify-content: space-between;
      }
      .bottom .row--right {
        text-align: right;
      }
      .bottom .row--center {
        text-align: center;
      }
      .bottom .row-2 {
        margin: 30px 0 60px 0;
        position: relative;
      }
      .bottom .row-2::after {
        content: "";
        position: absolute;
        width: 100%;
        bottom: -30px;
        left: 0;
        background: #cccccc;
        height: 1px;
      }


      </style>
    `;


    // Crear una instancia de Puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Cargar el HTML en la página
    await page.setContent(html);

    // Generar el PDF
    const pdf = await page.pdf({ format: 'A4', printBackground: true });

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







