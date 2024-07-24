from classes import genres
from flask import make_response, jsonify

def getAllGenres():
    try:
        genre = genres.Genre()
        getGenres = genre.getAllGenres()
        match getGenres["message"]:
            case "no genres were found":
                resp = make_response(jsonify({getGenres}))
                resp.status_code = 404
                return resp
            case "genres found":
                resp = make_response(jsonify({getGenres}))
                resp.status_code =200
                return resp
            case "An error has occurred while getting the list of genres":
                resp = make_response(jsonify({getGenres}))
                resp.status_code =500
                return resp
    except Exception as e:
        resp = make_response(jsonify({"message":"There was an error", "error":e.args}))
        resp.status_code = 500
        return resp