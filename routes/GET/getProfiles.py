from classes import profiles
from flask import make_response, jsonify

def getProfiles(userId):
    try:
        profile = profiles.Profile(userId=userId)
        allProfiles = profile.getProfiles()
        match allProfiles["message"]:
            case "profiles found":
                resp = make_response(jsonify(allProfiles))
                resp.status_code = 200
                return resp
            case "An error has occurred while getting the list of profiles":
                resp = make_response(jsonify(allProfiles))
                resp.status_code = 500
                return resp
    except Exception as e:
        resp = make_response(jsonify({"message":"There was an error", "error":e.args}))
        resp.status_code = 500
        return resp
