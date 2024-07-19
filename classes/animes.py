from libs import db
from flask import jsonify
from classes import genres

class Anime:


    def __init__(self,id=0,name="",synopsis="",releaseYear="",studio="",cover="",image="",onGoing=0,horizontalImage="",genres=[]):
        self.id=id
        self.name = name 
        self.synopsis = synopsis 
        self.releaseYear=releaseYear 
        self.studio=studio 
        self.cover=cover 
        self.image=image 
        self.onGoing=onGoing 
        self.horizontalImage=horizontalImage
        self.genres=genres 

    def new(self):
        try:
            # This is the query used to create the anime
            createAnimeQuery= "INSERT INTO Animes(name,synopsis,releaseYear,studio,cover,image,onGoing,horizontal_image) VALUES(%s,%s,%s,%s,%s,%s,%s,%s)"
        
            # The functions that are used to create the anime
            db.dbCursor.execute(createAnimeQuery,[self.name,self.synopsis,self.releaseYear,self.studio,self.cover,self.image,self.onGoing,self.horizontalImage])
            db.db.commit()

            # Save the animeId to use it then
            animeId = db.dbCursor.lastrowid

            # Get every genre in the array to store it in the db
            for genre in self.genres:

                # Check if the genre already exists
                doesItExistQuery="SELECT * FROM Genres WHERE name=%s"
                db.dbCursor.execute(doesItExistQuery,[genre ])
                doesItExist = db.dbCursor.fetchall()

                if len(doesItExist) <=0 or doesItExist==[]:
                    # If it doesn't exist store it in both tables, Genres and Genre
                    createGenreWithAnime = "INSERT INTO Genres(name,anime_id) VALUES(%s,%s)"
                    createGenreWithoutAnime = "INSERT INTO Genre(name) VALUES(%s)"
                    db.dbCursor.execute(createGenreWithAnime , [genre,animeId])
                    db.dbCursor.execute(createGenreWithoutAnime, [genre])
                    db.db.commit()
                else:
                
                    # if it does exist, store it just in the Genres table
                    createGenreWithAnime = "INSERT INTO Genres(name,anime_id) VALUES(%s,%s)"
                
                    db.dbCursor.execute(createGenreWithAnime , [genre,animeId])
                    db.db.commit()
            return {"message":"The anime has been created"}
        except Exception as e:
            return {"message":"An unknown error has occurred has happened while creating the anime", "error":e.args}

            

    
    def getAll(self):
        try:
            getAllAnimesQuery = "SELECT * FROM Animes ORDER BY Animes.id DESC"
            db.dbCursor.execute(getAllAnimesQuery)
            animes = db.dbCursor.fetchall()
            if not animes:
                return {"message":"no animes was found"}
            return {"message":"Animes found","animes":animes}
        except Exception as e:
            return {"message":"There was an error while getting the animes", "errors":e.args}
    
    def getOne(self):
        try:
            getAnimeQuery="SELECT * FROM Animes WHERE id=%s"
            updateViewsCounterQuery="UPDATE Animes SET views_=%s WHERE id=%s"

            getAnimeGenresQuery="SELECT * FROM Genres WHERE anime_id=%s"
            db.dbCursor.execute(getAnimeQuery,[self.id])
            anime = db.dbCursor.fetchone()
            if not anime:
                return {"message":"No anime found"}
            newViewsNumber= anime[8] + 1
            
            db.dbCursor.execute(updateViewsCounterQuery, [newViewsNumber,self.id])
            db.dbCursor.execute(getAnimeGenresQuery,[self.id])
            db.db.commit()
            genres = db.dbCursor.fetchall()
            return {"anime":{"id":anime[0],"name":anime[1],"synopsis":anime[2],"releaseYear":anime[3],"studio":anime[4],"cover":anime[5],"image":anime[6],"horizontalImage":anime[9],"onGoing":anime[7],"views":anime[8]},"genres":genres,"message":"The anime was found"}
        except Exception as e:
            return {"message":"An error has occurred while gettin the anime","error":e.args}

    def updateAnime(self):
        try:
            doesTheAnimeExistQuery="SELECT name FROM Animes WHERE id=%s"
            db.dbCursor.execute(doesTheAnimeExistQuery, [self.id])
            doesTheAnimeExist=db.dbCursor.fetchall()
            if not doesTheAnimeExist:
                return {"message":"The given id doesn't match with any anime, check it"}
            updateAnimeQuery = "UPDATE Animes SET name=%s,synopsis=%s,releaseYear=%s,studio=%s,cover=%s,image=%s,horizontal_image=%s,onGoing=%s"
            db.dbCursor.execute(updateAnimeQuery,[self.name,self.synopsis,self.releaseYear,self.studio,self.cover,self.image,self.horizontalImage,self.onGoing])
            db.db.commit()
            return {"message":"The anime have been updated"}
        except Exception as e:
            return {"message":"An error has occurred while updating the anime data","error":e.args}  
    
    def getAnimesOfAnStudio(self):
        try:
            getQuery = "SELECT * FROM Animes WHERE studio=%s"

            db.dbCursor.execute(getQuery,[self.studio])

            animes = db.dbCursor.fetchall()

            if not animes:
                return {"message":"No animes were found"} 
            
            return {"animes":animes, "message":"Animes found"}
        except Exception as e:
            return {"message":"An error has occurred while getting the animes","error":e.args}

    def getSimilarAnime(self):
        similarAnime=[]

        db.dbCursor.execute("SELECT * FROM Genres WHERE anime_id=%s",[self.id])
        genresOfTheAnime = db.dbCursor.fetchall()

        db.dbCursor.execute("SELECT anime_id FROM Genres WHERE name=%s",[genresOfTheAnime[0][1]])
        animes = db.dbCursor.fetchall()

        for animeWithTheGenre in animes:
            
            if int(animeWithTheGenre[0]) != self.id:
                similarAnime.append(animeWithTheGenre)

        return {"animes":similarAnime}
                

        
