from flask import jsonify
from libs import db


class Episode:
    def __init__(self,id=0,animeId=0,episodeNumber=0,episodeTitle="",episodeSynopsis="",thumbnail="",link=""):
        self.id= id
        self.animeId=animeId
        self.episodeNumber=episodeNumber
        self.episodeTitle = episodeTitle
        self.episodeSynopsis = episodeSynopsis
        self.thumbnail=thumbnail
        self.link=link

    def new(self):
        doesTheAnimeExistQuery = "SELECT name FROM Animes WHERE id=%s"
        db.dbCursor.execute(doesTheAnimeExistQuery,[self.animeId])
        doesTheAnimeExist = db.dbCursor.fetchall()

        if not doesTheAnimeExist:
            return {"message":"The given anime doesn't exist"}
        
        newEpisodeQuery = "INSERT INTO Episodes(anime_id,episode_number,episode_title,episode_synopsis,thumbnail,link) VALUES(%s,%s,%s,%s,%s,%s)"
        db.dbCursor.execute(newEpisodeQuery,[self.animeId,self.episodeNumber,self.episodeTitle,self.episodeSynopsis,self.thumbnail,self.link])
        db.db.commit()
        return {"message":"A new episode has been added"}

    def getAllEpisodes(self):
        doesTheAnimeExistQuery = "SELECT name FROM Animes WHERE id=%s"
        db.dbCursor.execute(doesTheAnimeExistQuery,[self.animeId])
        doesTheAnimeExist = db.dbCursor.fetchall()

        if not doesTheAnimeExist:
            return {"message":"The given anime doesn't exist"}
        getEpisodesQuery = "SELECT * FROM Episodes WHERE anime_id=%s ORDER BY Episodes.id ASC"

        db.dbCursor.execute(getEpisodesQuery,[self.animeId])

        episodes = db.dbCursor.fetchall()

        return {"episodes":episodes}
    
    def getOneEpisode(self):
        getEpisodeQuery = "SELECT * FROM Episodes WHERE anime_id=%s AND episode_number=%s"

        db.dbCursor.execute(getEpisodeQuery, [self.animeId,self.episodeNumber])

        episode = db.dbCursor.fetchone()

        if not episode:
            return jsonify({"message":"episode not found"}), 404
        
        return jsonify(episode), 200