from classes import Lists
from flask import make_response, jsonify

def add(profileId,name):
    try:
        list = Lists.List(profileId=profileId,name = name)

        newList = list.new()

        match newList["message"]:
            case "The given profile does not exist":
                resp = make_response(jsonify(newList))
                resp.status_code = 404
                return resp
            
            case "A new list has been created":
                resp = make_response(jsonify(newList))
                resp.status_code = 201
                return resp
            case "An error has occurred while createing the list":
                resp = make_response(jsonify(newList))
                resp.status_code = 500
                return resp
    except Exception as e:
        resp = make_response(jsonify({"message":"There was an error", "error":e.args}))
        resp.status_code = 500
        return resp 
