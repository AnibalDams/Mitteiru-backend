import json
from flask import Flask, jsonify,request
from flask_cors import CORS,cross_origin, make_response
from routes.DELETE import deleteProfile, removeFromL
from routes.GET import allAnimes, getAllGenres, getAnime, getAnimesOfAnStudio, getAnimesWithTheGenre, getEpisode, getEpisodes,getProfiles,getList, getSimilarAnime
from routes.POST import addToList, createAnime, login, newEpisode, newProfile, newUser
from routes.PUT import updateAnime

from classes import users

app = Flask(__name__)

CORS(app)




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
    return getAnime.getAnime(animeId)


@app.route("/anime/genre/all")
def allGenres():
    return jsonify(getAllGenres.getAllGenres())



@app.route("/anime/<int:animeId>/episode/all")
def get(animeId:int):
    return jsonify(getEpisodes.get(animeId))



@app.route("/anime/<int:animeId>/episode/<int:episodeNumber>")
def getOneEpisode(animeId:int,episodeNumber:int):
    return getEpisode.get(animeId,episodeNumber)


@app.route("/anime/genre/<genre>")
def getAG(genre):
    return getAnimesWithTheGenre.get(genre)


@app.route("/anime/studio/<studio>")
def getAS(studio):
    return getAnimesOfAnStudio.get(studio)

@app.route("/anime/<int:animeId>/similar")
def getSimilar(animeId:int):
    return getSimilarAnime.get(animeId)


@app.route("/user/<int:userId>/profile/all")
def allProfiles(userId:int):
    return jsonify(getProfiles.getProfiles(userId)), {"Access-Control-Allow-Origin":"*"}


@app.route("/user/<int:userId>")
def getUser(userId:int):
    return jsonify(users.User().getUserById(userId))

@app.route("/user/profile/<int:profileId>/list/all")
def getL(profileId:int):
    return jsonify(getList.get(profileId))



# POST
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
    episodeData = json.loads(request.data)
    return jsonify(newEpisode.new(animeId,episodeData))


@app.route("/user/new", methods=["POST"])
def createUser():
    user=json.loads(request.data)
    
    return jsonify(newUser.create(user)), {"Access-Control-Allow-Origin":"*"}




@app.route("/user/profile/new",methods=["POST"])
def createProfile():
    profile=json.loads(request.data)
    return jsonify(newProfile.create(profile))

@app.route("/user/login",methods=["POST"])
def enter():
    userData=json.loads(request.data)
    return jsonify(login.get(userData)), {"Access-Control-Allow-Origin":"*"}


@app.route("/user/profile/<int:profileId>/list/add",methods=["POST"])
def add(profileId:int):
    body = json.loads(request.data)
    return jsonify(addToList.add(profileId,body))






# PUT

@app.route("/anime/<int:animeId>/update",methods=["PUT"])
def update(animeId:int):
    animeData = json.loads(request.data) 
    return jsonify(updateAnime.update(animeId,animeData))   

@app.route("/user/profile/<int:profileId>")
def updateP(profileId:int):
    profileData = json.loads(request.data)
    return jsonify(updateProfile.update())



# DELETE

@app.route("/user/profile/<int:profileId>/list/anime/<int:animeListId>",methods=["DELETE"])
def removeFromList(profileId:int,animeListId:int):
    return jsonify(removeFromL.remove(animeListId=animeListId,profileId=profileId))



@app.route("/user/profile/<int:profileId>/delete", methods=["DELETE"])
def deleteP(profileId:int):
    return deleteProfile.delete(profileId)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)