from classes import profiles
from flask import make_response, jsonify

def update(profileId, profileData):
    try:
        if not profileData["admin"]:
            return {"message":"You don't have admin privilegies"}

        profile =profiles.Profile(id=profileId,name=profileData["name"],photo=profileData["photo"])
        updateProfile = profile.updateProfile() 
        match updateProfile["message"]:
            case "This profile doesn't exist":
                resp = make_response(updateProfile)
                resp.status_code = 404
                return resp
            case "The profile has been updated":
                resp = make_response(updateProfile)
                resp.status_code = 200
                return resp
            case "An error has occurred while updating the profile":
                resp = make_response(updateProfile)
                resp.status_code = 500
                return resp
    except Exception as e:
        if e.args[0]=="name" or e.args[0]=="photo":
            resp = make_response({"message":"Please, insert the value {}".format(e.args[0])})
            resp.status_code = 400
            return resp
        resp = make_response({"message":"There was an error","error":e.args})
        resp.status_code = 500
        return resp