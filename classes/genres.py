from libs import db
from classes import animes

from flask import jsonify


class Genre:

    def __init__(self,genre="",animeId=""):
        self.genre = genre
        self.animeId=animeId

    def getAllGenres(self):
        try:
            getAllGenresQuery = "SELECT * FROM Genre ORDER BY name ASC"
            db.dbCursor.execute(getAllGenresQuery)
            genres = db.dbCursor.fetchall()
            if not genres:
                return {"message":"no genres were found"}
            return {"message":"genres found","genres":genres}
        except Exception as e:
            return  {"message":"An error has occurred while getting the list of genres", "error":e.args}
    

    def getAnimesOfAGenre(self):
        getAnimesWithTheGenre = "SELECT Animes.id, Animes.name, Animes.synopsis, Animes.releaseYear, Animes.studio, Animes.cover, Animes.image, Animes.onGoing, Animes.views_, Animes.horizontal_image FROM Genres INNER JOIN Animes on Animes.id = anime_id WHERE Genres.name=%s;"
        db.dbCursor.execute(getAnimesWithTheGenre,[self.genre])
        animesWithTheGenre = db.dbCursor.fetchall()

        if len(animesWithTheGenre) <=0:
            return jsonify({"message":"No animes found with this genre"}), 404

        

        return jsonify({"animes":animesWithTheGenre}), 200



    