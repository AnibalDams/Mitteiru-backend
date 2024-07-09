from classes import Lists


def add(profileId,data):
    list = Lists.List(profileId=profileId,animeId=data["animeId"],animeTitle=data["animeTitle"],animeSynopsis=data["animeSynopsis"],animeCover=data["animeCover"],animeImage=data["animeImage"])

    return list.new()