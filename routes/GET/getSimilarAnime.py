from classes import animes


def get(animeId):
    anime = animes.Anime(id=animeId)

    return anime.getSimilarAnime()