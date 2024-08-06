from libs import db
from classes import Lists

class Profile:
    def __init__(self,id=0,name="",userId=0,photo=""):
        self.id=id
        self.name=name
        self.userId=userId
        self.photo=photo
 
    def create(self):
        try:
            createProfileQuery="INSERT INTO Profiles(user_id,photo,name) VALUES(%s,%s,%s)"
            db.dbCursor.execute(createProfileQuery,[self.userId,self.photo,self.name])
            profileId = db.dbCursor.lastrowid
         
            db.db.commit()
            list = Lists.List(profileId=profileId, name="Default")
            list.new()
            return{ "message":"The profile has been created" }
        except Exception as e:  
            return {"message":"An error has occurred while creating the profile", "error":e.args}
    
    def getProfiles(self):
        try:

            getProfilesQuery = "SELECT * FROM Profiles WHERE user_id=%s"
            db.dbCursor.execute(getProfilesQuery,[self.userId])
            profiles = db.dbCursor.fetchall()
            return {"Profiles":profiles,"message":"profiles found"}
        except Exception as e:
            return {"message":"An error has occurred while getting the list of profiles", "error":e.args}
    
    def updateProfile(self):
        try:
            updateProfilesQuery="UPDATE Profiles SET name=%s,photo=%s WHERE id=%s"
            doesTheProfileExistQuery = "SELECT name FROM Profiles WHERE id=%s"
            db.dbCursor.execute(doesTheProfileExistQuery,[self.id])
            doesTheProfileExist = db.dbCursor.fetchall()
            if not doesTheProfileExist:
                return {"message":"This profile doesn't exist"}

            db.dbCursor.execute(updateProfilesQuery,[self.name,self.photo,self.id])
            db.db.commit()
            return {"message":"The profile has been updated"}
        except Exception as e:
            return {"message":"An error has occurred while updating the profile","error":e.args}
    def deleteprofile(self):
        deleteProfileQuery = "DELETE FROM Profiles WHERE id=%s"
        db.dbCursor.execute(deleteProfileQuery,[self.id])
        db.db.commit()
        return {"message":"The profile has been deleted"},200