from classes import animes
from flask import make_response, jsonify

def get(animeId):
    try:
        anime = animes.Anime(id=animeId)
        getSimilarAnimes = anime.getSimilarAnime()
        match getSimilarAnimes["message"]:
            case "Animes found":
                resp = make_response(jsonify(getSimilarAnimes))
                resp.status_code = 200
                return resp
            case "An error has occurred while getting the anime":
                resp = make_response(jsonify(getSimilarAnimes))
                resp.status_code = 500
                return resp
        
    except Exception as e:
        resp = make_response(jsonify({"message":"An unknown error has occurred", "error":e.args}))
