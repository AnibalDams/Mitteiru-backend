from flask import jsonify
from classes import episodes

def get(animeId,episodeNumber):
    episode = episodes.Episode(animeId=animeId,episodeNumber=episodeNumber)

    return episode.getOneEpisode()