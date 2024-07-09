from classes import profiles



def delete(profileId):
    profile = profiles.Profile(id=profileId)

    return profile.deleteprofile()