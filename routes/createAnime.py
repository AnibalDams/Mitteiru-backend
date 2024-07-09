from classes import animes


# This function creates a new anime
def createAnime(animeData):
    if not animeData["admin"]:
        return {"message":"You don't have admin privilegies"}
    newAnime = animes.Anime(name=animeData["name"],synopsis=animeData["synopsis"],releaseYear=animeData["releaseYear"],studio=animeData["studio"],cover=animeData["cover"],image=animeData["image"],onGoing=animeData["onGoing"],genres=animeData["genres"],horizontalImage=animeData["horizontalImage"])
    newAnime.new()
    return {"message":"The anime have been added"}