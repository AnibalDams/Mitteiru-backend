from classes import profiles


def getProfiles(userId):
    profile = profiles.Profile(userId=userId)
    return profile.getProfiles()