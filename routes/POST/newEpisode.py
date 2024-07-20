from classes import episodes
from flask import make_response, jsonify

def new(animeId,episodeData):
    try:
        if not episodeData["admin"]:
            return {"message":"You don't have admin privilegies"}
        episode = episodes.Episode(animeId=animeId,episodeNumber=episodeData["episodeNumber"],episodeSynopsis=episodeData["episodeSynopsis"],episodeTitle=episodeData["episodeTitle"],link=episodeData["link"],thumbnail=episodeData["thumbnail"])
        newEpisode = episode.new() 
        match newEpisode["message"]:
            case "The given anime doesn't exist":
                resp = make_response(jsonify(newEpisode))
                resp.status_code = 404
                return resp
            case "A new episode has been added":
                resp = make_response(jsonify(newEpisode))
                resp.status_code = 201
                return resp    
            case "An error has occurred while creating the episode":
                resp = make_response(jsonify(newEpisode))
                resp.status_code = 500
                return resp    
                
    except Exception as e:
        if e.args[0] =="admin" or e.args[0]=="animeId" or e.args[0] == "episodeNumber" or e.args[0] == "episodeSynopsis" or e.args[0] == "episodeTitle" or e.args[0] == "link" or e.args[0] =="thumbnail":
            resp = make_response({"message":"Please, insert the {} data".format(e.args[0])})
            resp.status_code = 400
            return resp
        resp = make_response({"message":"There was an error","error":e.args})
        resp.status_code = 500
        return resp