from libs import db


class List:

    def __init__(self,id=0,profileId=0,animeId=0,animeTitle="",animeSynopsis="",animeCover="",animeImage=""):
            self.id = id
            self.profileId = profileId
            self.animeId=animeId
            self.animeTitle = animeTitle
            self.animeSynopsis=animeSynopsis
            self.animeCover = animeCover
            self.animeImage=animeImage


    def new(self):
        doesTheProfileExistQuery = "SELECT id FROM Profiles WHERE id=%s"

        db.dbCursor.execute(doesTheProfileExistQuery,[self.profileId])

        doesTheProfileExist = db.dbCursor.fetchall()

        if not doesTheProfileExist:
            return {"message":"The given profile does not exist"}

        newAnimeToListQuery = "INSERT INTO Lists(profile_id,anime_id,anime_title,anime_synopsis,anime_cover,anime_image) VALUES(%s,%s,%s,%s,%s,%s)"

        db.dbCursor.execute(newAnimeToListQuery,[self.profileId,self.animeId,self.animeTitle,self.animeSynopsis,self.animeCover,self.animeImage])
        db.db.commit()

        return {"message":"The given anime has been added to the list"}
    

    def remove(self):
        removeFromListQuery ="DELETE FROM Lists WHERE anime_id=%s AND profile_id=%s" 
        db.dbCursor.execute(removeFromListQuery,[self.animeId, self.profileId])
        db.db.commit()
        return {"message":"The anime has benn deleted from the list"}

    def getAll(self):
        doesTheProfileExistQuery = "SELECT id FROM Profiles WHERE id=%s"

        db.dbCursor.execute(doesTheProfileExistQuery,(self.profileId,))

        doesTheProfileExist = db.dbCursor.fetchall()

        if not doesTheProfileExist:
            return {"message":"The given profile does not exist"}
        
        getListQuery = "SELECT * FROM Lists WHERE profile_id=%s"

        db.dbCursor.execute(getListQuery,[self.profileId])

        list = db.dbCursor.fetchall()

        return {"list":list} 