from libs import db
from classes import animes

from flask import jsonify


class Genre:

    def __init__(self,genre="",animeId=""):
        self.genre = genre
        self.animeId=animeId

    def getAllGenres(self):
        getAllGenresQuery = "SELECT * FROM Genre ORDER BY name ASC"
        db.dbCursor.execute(getAllGenresQuery)
        genres = db.dbCursor.fetchall()
        if not genres:
            return {"message":"no genres were found"}
        return {"message":str(len(genres))+" "+"genres were found","genres":genres}
    

    def getAnimesOfAGenre(self):
        animesWithTheGenre = []
        allAnimes = animes.Anime().getAll()["animes"]
        getAnimesWithTheGenre = "SELECT anime_id from Genres WHERE name=%s"
        db.dbCursor.execute(getAnimesWithTheGenre,[self.genre])
        idAnimesWithTheGenre = db.dbCursor.fetchall()

        if len(idAnimesWithTheGenre) <=0:
            return jsonify({"message":"No animes found with this genre"}), 404
        for genre in idAnimesWithTheGenre:
            for anime in allAnimes:
                if anime[0] == int(genre[0]):
                    animesWithTheGenre.append(anime)

        return jsonify({"animes":animesWithTheGenre}), 200



    