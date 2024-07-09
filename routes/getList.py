from classes import Lists

def get(profileId):
    list = Lists.List(profileId=profileId)

    return list.getAll()