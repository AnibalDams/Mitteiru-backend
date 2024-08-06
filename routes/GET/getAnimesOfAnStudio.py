from classes import animes
from flask import make_response, jsonify

def get(studio):
    try:
        anime = animes.Anime(studio=studio)
        getAnimes =anime.getAnimesOfAnStudio() 
        match getAnimes["message"]:
            case "No animes were found":
                resp = make_response(jsonify(getAnimes))
                resp.status_code = 404
                return resp
            case "Animes found":
                resp = make_response(jsonify(getAnimes))
                resp.status_code = 200
                return resp
            case "An error has occurred while getting the animes":
                resp = make_response(jsonify(getAnimes))
                resp.status_code = 200
                return resp
    
    except Exception as e:
        resp = make_response(jsonify({"message":"An error has occurred", "error":e.args}))
        resp.status_code = 500
        return resp

