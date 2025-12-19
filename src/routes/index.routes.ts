/**
 * Descripción: Configuración y documentación completa de todas las rutas para la aplicación.
 *
 * Notas importantes:
 * - La segmentación "/d/" (por ejemplo, en "/anime/d/all" o "/anime/d/mostPopular")
 *   se utiliza para evitar colisiones con rutas paramaterizadas (que usan ":param").
 *   Esto asegura que las rutas fijas se resuelvan sin conflicto con rutas dinámicas.
 *
 * - En la ruta DELETE para eliminar un anime de una lista ("/user/profile/list/:listId/anime/:animeId"),
 *   no se solicita el profileId porque el listId es suficiente para identificar la lista de manera única.
 */

import { Router } from "express";
import { htmlPage } from "../libs/page";

// ---------------------------
// Importación de módulos POST
// ---------------------------
import newAnime from "./POST/newAnime";               // Crea un nuevo anime.
import addEpisode from "./POST/addEpisode";             // Agrega un episodio a un anime.
import signUp from "./POST/signUp";                     // Registra un nuevo usuario.
import login from "./POST/login";                       // Permite el inicio de sesión del usuario.
import newProfile from "./POST/newProfile";             // Crea un nuevo perfil para un usuario.
import newList from "./POST/newList";                   // Crea una nueva lista para un perfil.
import addAnimeToList from "./POST/addToListAnime";     // Agrega un anime a una lista.
import addToHistory from "./POST/addToHistory";         // Añade un episodio al historial de visualización.
import newComment from "./POST/newComment";             // Publica un nuevo comentario.
import addLikeToAnime from "./POST/addLike";            // Agrega un "like" a un anime.
import addReview from "./POST/addReview";               // Crea una reseña para un anime.
import addLikeToComment from "./POST/addLikeToComment"; // Agrega un "like" a un comentario.

// ---------------------------
// Importación de módulos GET
// ---------------------------
import getAllAnimes from "./GET/getAllAnimes";                 // Obtiene todos los animes.
import getAnimeById from "./GET/getAnimeById";                 // Obtiene detalles de un anime específico.
import getEpisodes from "./GET/getEpisodes";                   // Lista los episodios de un anime.
import getMostPopularAnime from "./GET/getMostPopularAnime";   // Obtiene el anime más popular.
import getSimilarAnimes from "./GET/getSimilarAnime";          // Lista animes similares.
import getAllProfiles from "./GET/getAllProfiles";             // Lista todos los perfiles de usuario.
import getLists from "./GET/getList";                          // Obtiene todas las listas de un perfil.
import getAnimesInList from "./GET/getAnimesInList";           // Lista los animes de una lista específica.
import getAnimesOfAGenre from "./GET/getAnimesOfAGenre";       // Obtiene animes de un género específico.
import getAllGenres from "./GET/getAllGenres";                 // Obtiene todos los géneros de anime.
import getAnimesOfAnStudio from "./GET/getAnimesOfAnStudio";   // Lista animes de un estudio específico.
import getAnimeOfAyear from "./GET/getAnimesOfAYear";          // Obtiene animes de un año específico.
import getHistory from "./GET/getHistory";                     // Muestra el historial de visualización de un perfil.
import getLikes from "./GET/getrLikes";                        // Cuenta los "likes" de un anime.
import getAnimesWithMostLikes from "./GET/getAnimesWithMostLikes"; // Lista los animes con mayor cantidad de "likes".
import getReviews from "./GET/getAllReviews";                  // Obtiene todas las reseñas de un anime.
import getReviewById from "./GET/getReviewById";               // Obtiene una reseña específica de un anime.
import decodeToken from "./GET/decodeToken";                   // Decodifica el token del usuario.
import getCommentLikes from "./GET/getCommentLikes";           // Obtiene tanto el conteo de likes de un episodio, y los perfiles que le han dado like

// ------------------------------
// Importación de módulos DELETE
// ------------------------------
import removeAnimeFromList from "./DELETE/removeFromList";      // Elimina un anime de una lista.
import deleteProfile from "./DELETE/deleteProfile";            // Elimina un perfil de usuario.

// ---------------------------
// Importación de módulos PUT
// ---------------------------
import updateProfile from "./PUT/updateProfile";               // Actualiza información de un perfil.
import getComments from "./GET/getComments";                   // Obtiene los comentarios de un episodio.
import getRandomAnime from "./GET/getRandomAnime";

// Crear el Router principal de Express
const route = Router();

// ================================
// Rutas GET - Consultas de datos
// ================================

// Ruta raíz: envía una página HTML básica.
route.get("/", (req, res) => {
  res.send(htmlPage);
});

// Decodificar token del usuario.
route.get("/user/decode", decodeToken);

// -------------------------------
// Rutas de Animes (GET)
// -------------------------------

// Detalles de un anime específico (ruta dinámica por :animeId).
route.get("/anime/:animeId", getAnimeById);

// Obtener todos los animes.
// Se utiliza "/d/" para rutas fijas, evitando conflicto con los parámetros.
route.get("/anime/d/all", getAllAnimes);

// Obtener un anime random
route.get("/anime/d/random", getRandomAnime);

// Obtener el anime más popular.
route.get("/anime/d/mostPopular", getMostPopularAnime);

// Obtener animes de un estudio específico.
route.get("/anime/d/studio/:studio", getAnimesOfAnStudio);

// Obtener animes de un año específico.
route.get("/anime/d/year/:year", getAnimeOfAyear);

// Obtener animes con más "likes".
route.get("/anime/d/mostLiked", getAnimesWithMostLikes);

// Obtener animes similares a uno específico.
route.get("/anime/:animeId/similar", getSimilarAnimes);

// Contar "likes" de un anime.
route.get("/anime/:animeId/likes/count", getLikes);

// Animes de un género específico.
route.get("/anime/genre/:genre", getAnimesOfAGenre);

// Obtener todos los géneros de anime.
route.get("/anime/genre/d/all", getAllGenres);

// Obtener todas las reseñas de un anime.
route.get("/anime/:animeId/review/all", getReviews);

// Obtener una reseña específica de un anime.
route.get("/anime/:animeId/review/:reviewId", getReviewById);

// -------------------------------
// Rutas de Episodios (GET)
// -------------------------------

// Obtener todos los episodios de un anime.
route.get("/anime/:animeId/episode/all", getEpisodes);

// Obtener todos los comentarios de un episodio.
route.get("/anime/episode/:episodeId/comment/all", getComments);

// Obtiene los likes de un episodio
route.get("/anime/episode/:episodeId/comment/likes/all", getCommentLikes)

// -------------------------------
// Rutas de Perfiles (GET)
// -------------------------------

// Obtener todos los perfiles asociados a un usuario.
route.get("/user/:userId/profile/d/all", getAllProfiles);

// Obtener el historial de visualización de un perfil.
route.get("/user/profile/:profileId/history", getHistory);

// -------------------------------
// Rutas de Listas (GET)
// -------------------------------

// Obtener todas las listas de un perfil.
route.get("/user/profile/:profileId/list/all", getLists);

// Obtener todos los animes contenidos en una lista específica.
route.get("/user/profile/:profileId/list/anime/all", getAnimesInList);

// ================================
// Rutas POST - Creación y modificación de datos
// ================================

// --- Operaciones sobre Animes ---
// Crear un nuevo anime.
route.post("/anime/new", newAnime);

// Agregar un "like" a un anime para un perfil específico.
route.post("/anime/:animeId/like/:profileId", addLikeToAnime);

// Agregar una nueva reseña a un anime.
route.post("/anime/:animeId/review/new", addReview);

// --- Operaciones sobre Episodios ---
// Agregar un nuevo episodio a un anime.
route.post("/anime/:animeId/episode/new", addEpisode);

// Crear un nuevo comentario para un episodio.
route.post("/anime/episode/:episodeId/comment/new", newComment);

// Agregar un "like" a un comentario.
 route.post("/anime/episode/:episodeId/comment/:commentId/like/:profileId", addLikeToComment);

// --- Operaciones sobre Usuarios ---
// Registro de un nuevo usuario.
route.post("/user/new", signUp);

// Inicio de sesión.
route.post("/user/login", login);

// --- Operaciones sobre Perfiles ---
// Crear un nuevo perfil para un usuario.
route.post("/user/:userId/profile/d/new", newProfile);

// Agregar un episodio al historial de visualización de un perfil.
route.post("/user/profile/:profileId/history/:animeId/:episodeNumber/add", addToHistory);

// --- Operaciones sobre Listas ---
// Crear una nueva lista para un perfil.
route.post("/user/profile/:profileId/list/new", newList);

// Agregar un anime a una lista.
route.post("/anime/:animeId/list/:listId/add", addAnimeToList);

// ================================
// Rutas DELETE - Eliminación de datos
// ================================

// --- Operaciones sobre Perfiles ---
// Eliminar un perfil.
route.delete("/user/profile/:profileId/delete", deleteProfile);

// --- Operaciones sobre Listas ---
// Eliminar un anime de una lista.
// Se omite el profileId en la ruta, ya que el listId identifica de forma única la lista.
route.delete("/user/profile/list/:listId/anime/:animeId", removeAnimeFromList);

// ================================
// Rutas PUT - Actualización de datos
// ================================

// Actualizar información de un perfil.
route.put("/user/profile/:profileId", updateProfile);

// Exportar el Router para uso en la aplicación
export default route;
