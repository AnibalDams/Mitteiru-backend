from classes import genres


def get(genreName):
    genre = genres.Genre(genre=genreName)

    return genre.getAnimesOfAGenre()

