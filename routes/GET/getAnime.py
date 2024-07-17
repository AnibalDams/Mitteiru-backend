from classes import animes


def getAnime(animeId):
    animeC = animes.Anime(id=animeId)
    return animeC.getOne()
    
