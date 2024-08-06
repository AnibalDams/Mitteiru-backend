from flask import make_response, jsonify
from classes import animesInList


def add(animeId:int, listId:int, profileId:int):
    try:
        animeInList = animesInList.AnimeInList(animeId=animeId,listId=listId, profileId=profileId)
        addAnimeToList= animeInList.addAnimeToList()
        match addAnimeToList["message"]:

            case "The given anime does not exist":
                resp = make_response(jsonify(addAnimeToList))
                resp.status_code=404
                return resp
            case "The given list does not exist":
                resp = make_response(jsonify(addAnimeToList))
                resp.status_code=404
                return resp
            case "A new anime has been added to the list":
                resp = make_response(jsonify(addAnimeToList))
                resp.status_code=201
                return resp
            case "An error has occurred while adding the anime":
                resp = make_response(jsonify(addAnimeToList))
                resp.status_code=500
                return resp
            
    except Exception as e:
        resp = make_response(jsonify({"message":"There was an error","error":e.args}))
        resp.status_code=500
        return resp