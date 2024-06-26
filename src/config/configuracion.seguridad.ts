export namespace ConfiguracionSeguridad{
  //-------------------------menus -------------------------------------
  export const menu_ADMINISTAR_UsuarioID="659d0da41b1f206c3c146b94";
  export const menuRolID="659d0db11b1f206c3c146b95";
  export const menuTorneoID="659d0dc81b1f206c3c146b96";
  //-------------------------acciones -------------------------------------
  export const listarAccion="listar";
  export const guardarAccion="guardar";
  export const eliminarAccion="eliminar";
  export const editarAccion="editar";
  export const buscarAccion_id="buscar_id";

  //-------------------------roles -------------------------------------
  export const rolAdministradorID="6594c9c83be1024aa881a5a3";
  export const rolJugadorID="659904a09622df3580b5c275";





  //-------------------------host y endpoints -------------------------------------
  // servidor mcs-seguridad-Torneo
  export const hostSeguridad="http://127.0.0.1:3000";

  //mc-whatapp
  export const urlWhatsappLEAD = 'http://127.0.0.1:3002/lead';
  export const urlWhatsappMensajeArchivo = 'http://127.0.0.1:3002/mensaje-con-archivo';




  //-------------------------VARIABLES DE ENTORNO  -------------------------------------
    //instalar el paquete dotenv npm i dotenv para poder leer variables de entorno  y importar en application.ts require('dotenv').config();
    export const connection_user_postgres = process.env.CONNECTION_USER_POSTGRES ;
    export const connection_password_postgres = process.env.CONNECTION_PASSWORD_POSTGRES ;
    export const connection_database_postgres = process.env.CONNECTION_DATABASE_POSTGRES ;



}
