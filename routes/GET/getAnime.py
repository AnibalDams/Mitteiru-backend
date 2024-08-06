from classes import animes
from flask import make_response, jsonify

def getAnime(animeId):
    try:
        anime = animes.Anime(id=animeId)
        getOneAnime = anime.getOne() 
        
        match getOneAnime["message"]:
            case "No anime found":
                resp = make_response(jsonify(getOneAnime))
                resp.status_code = 404
                return resp
            case "The anime was found":
                resp = make_response(jsonify(getOneAnime))
                resp.status_code = 200
                return resp
            case "An error has occurred while gettin the anime":
                resp = make_response(jsonify(getOneAnime))
                resp.status_code = 500
                return resp
                            
    except Exception as e:
        resp = make_response(jsonify({"message":"An error has occurred", "error":e.args}))
        resp.status_code = 500
        return resp 