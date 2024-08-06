from classes import profiles
from flask import make_response, jsonify

def create(profileData):
    try:
        profile = profiles.Profile(name=profileData["name"],photo=profileData["photo"],userId=profileData["userId"])
        createProfile = profile.create()
        match createProfile["message"]:
            case "The profile has been created":
                resp = make_response(jsonify(createProfile))
                resp.status_code = 201
                return resp
            case "An error has occurred while creating the profile":
                resp = make_response(jsonify(createProfile))
                resp.status_code = 500
                return resp
    except Exception as e:
        if e.args[0]=="name"or e.args[0]=="photo"or e.args[0]=="userId":
            resp = make_response(jsonify({"message":"Please, add the following fields: {}".format(e.args[0])}))
            resp.status_code = 400
            return resp

        resp = make_response(jsonify({"message":"There was an error", "error":e.args}))
        resp.status_code = 500
        return resp