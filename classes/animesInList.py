from libs import db


class AnimeInList:
    def __init__(self,id=0,animeId=0,listId=0, profileId=0):
        self.id = id 
        self.animeId = animeId
        self.listId = listId
        self.profileId = profileId
        
    def addAnimeToList(self):
        try:
            addToListQuery = "INSERT INTO Animes_in_list(anime_id,list_id) VALUES(%s,%s)"
            verifyAnimeQuery = "SELECT id FROM Animes WHERE id=%s"
            verifyListQuery = "SELECT id FROM List_names WHERE id=%s AND profile_id=%s"

            #verify animes
            db.dbCursor.execute(verifyAnimeQuery, [self.animeId])
            verifyAnime = db.dbCursor.fetchone()

            if not verifyAnime:
                return {"message":"The given anime does not exist"}
            
            # verify list
            db.dbCursor.execute(verifyListQuery,[self.listId, self.profileId])

            verifyList = db.dbCursor.fetchone()
            
            if not verifyList:
                return {"message":"The given list does not exist"}
            
            # Add to list
            db.dbCursor.execute(addToListQuery,[self.animeId,self.listId])
            db.db.commit()
            return {"message":"A new anime has been added to the list"}
        except Exception as e:
            return {"message":"An error has occurred while adding the anime"}
    

    def getAllAnimes(self):
        try:
            getLists = "SELECT id, name FROM List_names WHERE profile_id=%s"
            getAnimes = "SELECT Animes.id, Animes.name,Animes.synopsis,Animes.releaseYear,Animes.studio,Animes.cover,Animes.image,Animes.onGoing,Animes.horizontal_image, Animes.views_, Animes_in_list.list_id FROM Animes_in_list INNER JOIN Animes on Animes.id = Animes_in_list.anime_id WHERE Animes_in_list.list_id=%s"
            allAnimes = []
            db.dbCursor.execute(getLists, [self.profileId])
            lists = db.dbCursor.fetchall()

            for list in lists:
                db.dbCursor.execute(getAnimes, [list[0]])
                animes = db.dbCursor.fetchall()
                for anime in animes:
   

                    allAnimes.append(anime)
            return {"message":"Animes found", "animes":allAnimes}
        except Exception as e:
            return {"message":"An error has occurred while getting the animes", "error":e.args}
    
    def removeAnime(self):
        try:
            verifyAnimeInListQuery = "SELECT anime_id FROM Animes_in_list WHERE anime_id=%s AND list_id=%s"
            removeAnimeInListQuery = "DELETE FROM Animes_in_list WHERE anime_id=%s AND list_id=%s"

            # verify anime in list
            db.dbCursor.execute(verifyAnimeInListQuery,[self.animeId,self.listId])
            verifyAnimeInList = db.dbCursor.fetchone()

            if not verifyAnimeInList:
                return {"message":"The given list or anime does not exist"}
            
            # delete
            db.dbCursor.execute(removeAnimeInListQuery,[self.animeId,self.listId])
            db.db.commit()

            return {"message":"The anime has been deleted"}
        except Exception as e:
            return {"message":"An error has occurred while deleting the anime"}
        

        
        
        