from classes import animes

def update(animeId,animeData):
    if not animeData["admin"]:
        return {"message":"You don't have admin privilegies"}
    anime = animes.Anime(id=animeId,name=animeData["name"],synopsis=animeData["synopsis"],releaseYear=animeData["releaseYear"],studio=animeData["studio"],cover=animeData["cover"],image=animeData["image"],onGoing=animeData["onGoing"],horizontalImage=animeData["horizontalImage"])
    return anime.updateAnime()