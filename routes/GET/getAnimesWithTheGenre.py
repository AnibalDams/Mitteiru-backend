from classes import genres
from flask import make_response,jsonify

def get(genreName):
    try:
        genre = genres.Genre(genre=genreName)
        getAnimes = genre.getAnimesOfAGenre() 
        match getAnimes["message"]:
            case "No animes found with this genre":
                resp = make_response(jsonify(getAnimes))
                resp.status_code = 404
                return resp
            case "animes found":
                resp = make_response(jsonify(getAnimes))
                resp.status_code = 200
                return resp
            case "An error has occurred while getting the anime of the genre":
                resp = make_response(jsonify(getAnimes))
                resp.status_code = 500
                return resp    

    except Exception as e:
        resp = make_response(jsonify({"message":"there was an error ", "error":e.args}))
        
        resp.status_code = 500
        return resp    

