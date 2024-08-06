from classes import Lists, animesInList
from flask import make_response, jsonify

def remove(animeListId, listId):
    try:
        anime = animesInList.AnimeInList(animeId=animeListId, listId=listId)
        delete = anime.removeAnime()
        match delete["message"]:
            case "The given list or anime does not exist":
                resp = make_response(jsonify(delete))
                resp.status_code=404
                return resp 
            case "The anime has been deleted":
                resp = make_response(jsonify(delete))
                resp.status_code=200
                return resp
            case "An error has occurred while deleting the anime":
                resp = make_response(jsonify(delete))
                resp.status_code=500
                return resp
    except Exception as e:
        resp = make_response(jsonify({"message":"There wasa an error", "error":e.args}))
        resp.status_code=500
        return resp 
    