from libs import db


class List:

    def __init__(self,id=0,profileId=0,name="",animeId=0,animeTitle="",animeSynopsis="",animeCover="",animeImage=""):
            self.id = id
            self.profileId = profileId
            self.name = name
            self.animeId=animeId
            self.animeTitle = animeTitle
            self.animeSynopsis=animeSynopsis
            self.animeCover = animeCover
            self.animeImage=animeImage


    def new(self):
        try:
            doesTheProfileExistQuery = "SELECT id FROM Profiles WHERE id=%s"

            db.dbCursor.execute(doesTheProfileExistQuery,[self.profileId])

            doesTheProfileExist = db.dbCursor.fetchall()

            if not doesTheProfileExist:
                return {"message":"The given profile does not exist"}

            newListQuery = "INSERT INTO List_names(name,profile_id) VALUES(%s,%s)"

            db.dbCursor.execute(newListQuery,[self.name,self.profileId])
            db.db.commit()

            return {"message":"A new list has been created"}
        except Exception as e:
             return {"message":"An error has occurred while createing the list", "error":e.args}
    

    def remove(self):
        removeFromListQuery ="DELETE FROM Lists WHERE anime_id=%s AND profile_id=%s" 
        db.dbCursor.execute(removeFromListQuery,[self.animeId, self.profileId])
        db.db.commit()
        return {"message":"The anime has benn deleted from the list","error":e.args}

    def getAll(self):
        try:
            doesTheProfileExistQuery = "SELECT id FROM Profiles WHERE id=%s"
            db.dbCursor.execute(doesTheProfileExistQuery,(self.profileId,))
            doesTheProfileExist = db.dbCursor.fetchall()

            if not doesTheProfileExist:
                return {"message":"The given profile does not exist"}
            
            getListQuery = "SELECT * FROM List_names WHERE profile_id=%s"
            db.dbCursor.execute(getListQuery,[self.profileId])
            list = db.dbCursor.fetchall()
            return {"list":list, "message":"Lists found"} 
        except Exception as e:
             return {"message":"An error has occurred while getting the list","error":e.args}