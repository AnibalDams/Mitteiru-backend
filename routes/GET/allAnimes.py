from classes import animes
from flask import make_response, jsonify

def getAllAnimes():
    try:
        anime = animes.Anime()
        allAnimes = anime.getAll()

        if allAnimes["message"] == "no animes was found":
            resp  = make_response(jsonify(allAnimes))
            resp.status_code = 404
            return resp
        elif allAnimes["message"] == "Animes found":
            resp = make_response(jsonify(allAnimes))
            resp.status_code = 200
            return resp
        elif allAnimes["message"] == "There was an error while getting the animes":
            resp = make_response(jsonify(allAnimes))
            resp.status_code = 500
            return resp

    except Exception as e:
        resp = make_response(jsonify({"message":"An unknown error has occurred", "error":e.args}))
        resp.status_code = 500
        return resp