import json
from flask import Flask, jsonify,request,make_response
from flask_cors import CORS
from routes.PUT import  updateProfile
from classes import users
from routes.DELETE import deleteProfile, removeFromL
from routes.GET import allAnimes, getAllGenres, getAnime, getAnimesOfAnStudio, getAnimesWithTheGenre, getEpisode, getEpisodes,getProfiles,getList, getSimilarAnime, getAnimesInList, getMosPopularAnime
from routes.POST import addToList, createAnime, login, newEpisode, newProfile, newUser, addAnimeToList
from routes.PUT import updateAnime

app = Flask(__name__)

CORS(app)



# GET routes

# Hellow world route
@app.route("/")
def hello():
    
    return "Hello world"


@app.route("/anime/all")
def getAllAnimes():
    try:
        return allAnimes.getAllAnimes()
    except Exception as e:
        resp = make_response(jsonify({"message":"An unknown error has occurred", "error":e.args}))
        resp.status_code = 500

@app.route("/anime/<int:animeId>")
def getOneAnime(animeId:int):
    try:
        return getAnime.getAnime(animeId)
    except Exception as e:
        resp = make_response(jsonify({"message":"There was an unknown error","error":e.args}))
        resp.status_code = 500
        return resp 


@app.route("/anime/genre/all")
def allGenres():
    try:
        return getAllGenres.getAllGenres()
    except Exception as e:
        resp = make_response(jsonify({"message":"An error has occurrred","error":e.args}))
        resp.status_code = 500
        return resp



@app.route("/anime/<int:animeId>/episode/all")
def get_episodes(animeId:int):
    try:
        return getEpisodes.get(animeId)
    except Exception as e:
        resp = make_response(jsonify({"message":"An error has occurred", "error":e.args}))
        resp.status_code = 500
        return resp



@app.route("/anime/<int:animeId>/episode/<int:episodeNumber>")
def getOneEpisode(animeId:int,episodeNumber:int):
    try:
        return getEpisode.get(animeId,episodeNumber)
    except Exception as e:
        resp = make_response(jsonify({"message":"An error has occurred", "error":e.args }))
        resp.status_code = 500
        return resp


@app.route("/anime/genre/<genre>")
def getAG(genre):
    try:
        return getAnimesWithTheGenre.get(genre)
    except Exception as e:
        resp = make_response(jsonify({"message":"An error has occurred","error":e.args}))
        resp.status_code=500
        return resp 


@app.route("/anime/studio/<studio>")
def getAS(studio):
    try:
        return getAnimesOfAnStudio.get(studio)
    except Exception as e:
        resp = make_response(jsonify({"message":"An unknown error has occurred", "error":e.args}))
        resp.status_code = 500
        return resp

@app.route("/anime/<int:animeId>/similar")
def getSimilar(animeId:int):
    try:
        return getSimilarAnime.get(animeId)
    except Exception as e:
        resp = make_response(jsonify({"message":"An error has occurred", "error":e.args}))
        resp.status_code = 500
        return resp

@app.route("/anime/mostpopular")
def getAnimesMostPopular():
    try:
        return getMosPopularAnime.get()
    except Exception as e:
        resp = make_response(jsonify({"message":"An error has occurred","error":e.args}))
        resp.status_code=500
        return resp

@app.route("/user/<int:userId>/profile/all")
def allProfiles(userId:int):
    try:
        return getProfiles.getProfiles(userId)
    except Exception as e:
        resp = make_response(jsonify({"message":"An error has occurred","error":e.args}))
        resp.status_code = 500
        return resp


@app.route("/user/<int:userId>")
def getUser(userId:int):
    return jsonify(users.User().getUserById(userId))

@app.route("/user/profile/<int:profileId>/list/all")
def getL(profileId:int):
    try:
        return getList.get(profileId)
    except Exception as e:
        resp = make_response(jsonify({"message":"An error has occurred","error":e.args}))
        resp.status_code=500
        return resp


# POST routes
# Route that creates a new anime with the given data using the createAnime funtion created in the routes folder
@app.route("/anime/new", methods=["POST"])
def create(): 
    try:
        # Get the body data 
        anime = json.loads(request.data)

        # Create the anime using the function giving the given data in the body and return the result
        return createAnime.create(anime)
    except Exception as e:
        resp = make_response(jsonify({"message":"An unknown error has occurred" , "error":e.args}))
        resp.status_code=500
        return resp



@app.route("/anime/<int:animeId>/episode/new",methods=["POST"])
def createEpisode(animeId:int):
    try:
        episodeData = json.loads(request.data)
        return newEpisode.new(animeId,episodeData)
    except Exception as e:
        resp = make_response(jsonify({"message":"An error has occurred", "error":e.args}))
        resp.status_code = 500
        return resp


@app.route("/user/new", methods=["POST"])
def createUser():
    user=json.loads(request.data)
    
    return jsonify(newUser.create(user)), {"Access-Control-Allow-Origin":"*"}




@app.route("/user/profile/new",methods=["POST"])
def createProfile():
    try:
        profile=json.loads(request.data)
        return newProfile.create(profile)
    except Exception as e:
        resp = make_response(jsonify({"message":"An error has occurred", "error":e.args}))
        resp.status_code = 500
        return resp

@app.route("/user/login",methods=["POST"])
def enter():
    userData=json.loads(request.data)
    return jsonify(login.get(userData)), {"Access-Control-Allow-Origin":"*"}


@app.route("/user/profile/<int:profileId>/list/<name>/new",methods=["POST"])
def add(profileId:int, name):
    try:
        return addToList.add(profileId,name)
    except Exception as e:
        resp = make_response(jsonify({"message":"An error has occurred","error":e.args}))
        resp.status_code = 500
        return resp 


@app.route("/user/profile/<int:profileId>/anime/<int:animeId>/list/<int:listId>/add", methods=["POST"])
def addAnimeList(profileId:int, animeId:int, listId:int):
    try:
        return addAnimeToList.add(animeId,listId,profileId)
    except Exception as e:
        resp = make_response(jsonify({"message":"An error has occurred","error":e.args}))
        resp.status_code=500
        return resp

@app.route("/user/profile/<int:profileId>/list/anime/all")
def getAnimeList(profileId:int):
    try:
        return getAnimesInList.get(profileId)
    except Exception as e:
        resp = make_response(jsonify({"message":"An error has occurred","error":e.args}))
        resp.status_code=500
        return resp

# PUT

@app.route("/anime/<int:animeId>/update",methods=["PUT"])
def update(animeId:int):
    try:
        animeData = json.loads(request.data) 
        return updateAnime.update(animeId,animeData)   
    except Exception as e:
        resp = make_response({"message":"An error has occurred", "error":e.args})
        resp.status_code = 500
        return resp
@app.route("/user/profile/<int:profileId>", methods=["PUT"])
def updateP(profileId:int):
    try:
        profileData = json.loads(request.data)
        return updateProfile.update(profileId,profileData)
    except Exception as e:
        resp = make_response({"message":"An error has occurred", "error":e.args})
        resp.status_code = 500
        return resp



# DELETE

@app.route("/user/profile/list/<int:listId>/anime/<int:animeListId>",methods=["DELETE"])
def removeFromList(listId:int,animeListId:int):
    try:
        return removeFromL.remove(animeListId=animeListId,listId=listId)
    except Exception as e:
        resp = make_response(jsonify({"message":"An error has occurred","error":e.args}))
        resp.status_code=500
        return resp


@app.route("/user/profile/<int:profileId>/delete", methods=["DELETE"])
def deleteP(profileId:int):
    return deleteProfile.delete(profileId)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)