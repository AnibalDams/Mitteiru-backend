from flask import jsonify, make_response
from classes import episodes

def get(animeId,episodeNumber):
    try:
        episode = episodes.Episode(animeId=animeId,episodeNumber=episodeNumber)
        getEpisode =episode.getOneEpisode() 
        match getEpisode["message"]:
            case "episode not found":
                resp  = make_response(jsonify(getEpisode))
                resp.status_code = 404
                return resp
            case "Episode found":
                resp  = make_response(jsonify(getEpisode))
                resp.status_code =200
                return resp
            case "An error has occurred while getting the episode":
                resp  = make_response(jsonify(getEpisode))
                resp.status_code =500
                return resp
                
    except Exception as e:
        resp = make_response(jsonify({"message":"There was an error", "error":e.args}))
        resp.status_code = 500
        return resp