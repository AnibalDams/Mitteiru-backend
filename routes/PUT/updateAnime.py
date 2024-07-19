from classes import animes
from flask import make_response, jsonify

def update(animeId,animeData):
    try:
        if not animeData["admin"]:
            return {"message":"You don't have admin privilegies"}
        anime = animes.Anime(id=animeId,name=animeData["name"],synopsis=animeData["synopsis"],releaseYear=animeData["releaseYear"],studio=animeData["studio"],cover=animeData["cover"],image=animeData["image"],onGoing=animeData["onGoing"],horizontalImage=animeData["horizontalImage"])
        updateAnime = anime.updateAnime() 
        match updateAnime["message"]:
            case "The given id doesn't match with any anime, check it":
                resp = make_response(updateAnime)
                resp.status_code=404
                return resp
            case "The anime have been updated":
                resp = make_response(updateAnime)
                resp.status_code=200
                return resp
            case "An error has occurred while updating the anime data":
                resp = make_response(updateAnime)
                resp.status_code=500
                return resp
                
    except Exception as e:
        if e.args[0] == "admin" or e.args[0] == "name" or e.args[0] =="synopsis" or e.args[0] == "releaseYear" or e.args[0] == "studio" or e.args[0] == "cover" or e.args[0] == "image" or e.args[0] == "onGoing" or e.args[0] == "horizontalImage":
            resp = make_response({"message":"Please, insert the field {}".format(e.args[0])})
            resp.status_code = 400
            return resp
        
        resp = make_response({"message":"An unknown error has occurred.","error":e.args })
        resp.status_code = 500
        return resp