from classes import animes
from flask import make_response,jsonify



# This function creates a new anime
def createAnime(animeData):
    try:
        if not animeData["admin"]:
            return {"message":"You don't have admin privilegies"}
        anime = animes.Anime(name=animeData["name"],synopsis=animeData["synopsis"],releaseYear=animeData["releaseYear"],studio=animeData["studio"],cover=animeData["cover"],image=animeData["image"],onGoing=animeData["onGoing"],genres=animeData["genres"],horizontalImage=animeData["horizontalImage"])
        newAnime = anime.new()
        if newAnime["message"]=="The anime has been created":
            resp = make_response(jsonify({"message":"The anime have been added"}))
            resp.status_code = 201
            return resp
        if newAnime["message"] == "An unknown error has occurred has happened while creating the anime":

            resp = make_response(jsonify(newAnime))
            resp.status_code = 500
            return resp
    except Exception as e:
        
        if e.args[0]=="admin" or e.args[0]=="name" or e.args[0]== "synopsis" or e.args[0]== "releaseYear" or e.args[0]=="studio" or e.args[0]=="cover" or e.args[0]== "image" or e.args[0]== "onGoing" or e.args[0]=="genres" or e.args[0]=="horizontalImage":
            resp = make_response(jsonify({"message":"You didn't insert the"+" "+e.args[0] +" "+ "value"}))
            resp.status_code = 400
            return resp
        
        resp=make_response(jsonify({"message":"An unknown error has occurred","error":e.args}))
        resp.status_code = 500
        return resp

        