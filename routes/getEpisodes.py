from classes import episodes


def get(animeId):
    episode = episodes.Episode(animeId=animeId)

    return episode.getAllEpisodes()