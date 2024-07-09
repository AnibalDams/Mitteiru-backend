from classes import episodes

def new(animeId,episodeData):
    if not episodeData["admin"]:
        return {"message":"You don't have admin privilegies"}
    episode = episodes.Episode(animeId=animeId,episodeNumber=episodeData["episodeNumber"],episodeSynopsis=episodeData["episodeSynopsis"],episodeTitle=episodeData["episodeTitle"],link=episodeData["link"],thumbnail=episodeData["thumbnail"])
    return episode.new()