from classes import animesInList
from flask import make_response, jsonify

def get(profileId):
    try:
        animeInList = animesInList.AnimeInList(profileId=profileId)
        allAnimes = animeInList.getAllAnimes()
        match allAnimes["message"]:
            case "Animes found":
                resp = make_response(jsonify(allAnimes))
                resp.status_code=200
                return resp
            case "An error has occurred while getting the animes":
                resp = make_response(jsonify(allAnimes))
                resp.status_code=500
                return resp 
    except Exception as e:
        resp = make_response(jsonify({"message":"There was an error", "error":e.args}))
        resp.status_code=500
        return resp