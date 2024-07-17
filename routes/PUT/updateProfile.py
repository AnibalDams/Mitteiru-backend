from classes import profiles


def update(profileId, profileData):
    if not profileData["admin"]:
        return {"message":"You don't have admin privilegies"}

    profile =profiles.Profile(id=profileId,name=profileData["name"],photo=profileData["photo"])
    return profile.updateProfile()