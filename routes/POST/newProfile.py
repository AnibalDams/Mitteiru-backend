from classes import profiles


def create(profileData):
    profile = profiles.Profile(name=profileData["name"],photo=profileData["photo"],userId=profileData["userId"])

    return profile.create()