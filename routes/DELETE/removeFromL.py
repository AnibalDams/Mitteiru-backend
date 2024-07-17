from classes import Lists


def remove(animeListId, profileId):
    list = Lists.List(animeId=animeListId, profileId=profileId)

    return list.remove()