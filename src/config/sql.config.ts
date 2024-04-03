export namespace SQLConfig {

  //funciones para el controlador de eventos SQL -------------------------------------------------------------------------------
  export const crearEvento = 'SELECT fun_insert_evento($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19)';
  export const obtenerEventoActivos= 'SELECT id_evento,foto_carta_fondo,foto_carta_titulo,foto_carta_personaje FROM tab_evento WHERE estado_evento = 1';
  export const obtenerEventoEnCurso= 'SELECT id_evento,foto_carta_fondo,foto_carta_titulo,foto_carta_personaje FROM tab_evento WHERE estado_evento = 2';
  export const obtenerEventoFinalizados= 'SELECT id_evento,foto_carta_fondo,foto_carta_titulo,foto_carta_personaje FROM tab_evento WHERE estado_evento = 3';
  export const obtenerEventoPorId = 'SELECT fun_get_evento2($1)';
  //funciones para el controlador de torneos SQL ----------------------------------------------------------------------------
  export const crearTorneo = 'SELECT fun_insert_torneo($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21)';
  export const obtenerTorneoPorId = 'SELECT id_torneo, nom_torneo, desc_torneo, fecha_inicio_torneo,fecha_fin_torneo, foto_torneo,premio_torneo_1,premio_torneo_2,premio_torneo_3,video_explica_torneo,cantidad_equipos,cantidad_match,valor_dinero_torneo, id_game, estado_torneo, informacion_general, informacion_reglas, foto_premio_torneo_1, foto_premio_torneo_2, foto_premio_torneo_3, foto_carta_fondo, foto_carta_titulo, foto_carta_personaje, id_evento  FROM  tab_torneo WHERE id_torneo = $1';
  export const obtenerTorneos = 'SELECT id_torneo, nom_torneo, desc_torneo, fecha_inicio_torneo,fecha_fin_torneo, foto_torneo,premio_torneo_1,premio_torneo_2,premio_torneo_3,video_explica_torneo,cantidad_equipos,cantidad_match,valor_dinero_torneo, id_game, estado_torneo, informacion_general, informacion_reglas, foto_premio_torneo_1, foto_premio_torneo_2, foto_premio_torneo_3, foto_carta_fondo, foto_carta_titulo, foto_carta_personaje, id_evento  FROM  tab_torneo';
  export const obtenerTorneosActivos = 'SELECT id_torneo, id_game, foto_carta_fondo, foto_carta_titulo, foto_carta_personaje FROM  tab_torneo WHERE estado_torneo = 1';
  export const obtenerTorneosEnJuego = 'SELECT id_torneo, id_game, foto_carta_fondo, foto_carta_titulo, foto_carta_personaje FROM  tab_torneo WHERE estado_torneo = 2';
  export const obtenerTorneosFinalizados = 'SELECT id_torneo, id_game, foto_carta_fondo, foto_carta_titulo, foto_carta_personaje FROM  tab_torneo WHERE estado_torneo = 3';
  export const registrarAsistenciaEvento = 'SELECT fun_insert_asistencia_evento($1,$2,$3)';
  //funciones para el controlador de equipos SQL -----------------------------------------------------------------------------
  export const crearEquipo = 'SELECT fun_insert_equipo($1,$2,$3,$4,$5,$6)';
  export const obtenerEquipoPorId = 'SELECT id_equipo, nom_equipo, desc_equipo, foto_equipo, id_game, estado_equipo, tamanio_equipo, lider_equipo, numero_torneos_ganados FROM tab_equipo WHERE id_equipo = $1';
  export const obtenerEquipoFULLPorId = 'SELECT fun_get_equipoFULL($1)';
  export const vincularJugadorEquipo = 'SELECT fun_insert_jugador_equipo_HASH($1,$2,$3)';
  export const registrarEquipoEnTorneo = 'SELECT fun_insert_equipo_torneo($1,$2,$3)';

  //funciones para el controlador de jugadores SQL ---------------------------------------------------------------------------
  export const obtenerJugadorPorId = 'SELECT fun_get_jugador_ID_PERFIL($1)';
  export const actualizarFotoJugador = 'SELECT fun_actualizar_foto_jugador($1,$2)';

  //funciones para el controlador publico SQL -----------------------------------------------------------------------------
  export const obtenerCiudades = 'SELECT * FROM tab_ciudad';
  export const obtenerTipoDocumento = 'SELECT * FROM tab_tipodocumento';






}
