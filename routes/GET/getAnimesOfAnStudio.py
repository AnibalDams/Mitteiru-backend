from classes import animes

def get(studio):
    anime = animes.Anime(studio=studio)

    return anime.getAnimesOfAnStudio()

