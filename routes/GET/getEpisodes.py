from classes import episodes
from flask import make_response, jsonify

def get(animeId):
    try:
        episode = episodes.Episode(animeId=animeId)
        getEpisodes =episode.getAllEpisodes() 

        match getEpisodes["message"]:
            case "The given anime doesn't exist":
                resp= make_response(jsonify(getEpisodes))
                resp.status_code = 404
                return resp
            case "episodes found":
                resp= make_response(jsonify(getEpisodes))
                resp.status_code = 200
                return resp
            case "An error has occurred while getting episodes":
                resp= make_response(jsonify(getEpisodes))
                resp.status_code = 500
                return resp

    except Exception as e:
        resp = make_response(jsonify({"message":"There was an error", "error":e.args}))
        resp.status_code= 500
        return resp