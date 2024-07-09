# What does this API do?


This API provides you **a variety of routes to build an anime streaming app** (In any platforms). It makes your app able to: 
- create users 
- login
-  update those users' data
-  delete users
-  create profiles
- update profiles
- delete profiles
- create animes
- look at those animes' information
- update those animes' information
- delete a given anime
- add episodes to an anime
- watch that episode
-    Add animes to a list dedicated to each user
- delete those animes from that list
- see the genres that are available in the API
- see what animes have that genre
- see the animes of a certain studio
> **:warning: These are the features that are available till a certain point of the development, more features can be added later, and they will be listed here**

## What are the routes avialables in this API? 


Ok, here you have a list of all the routes that this API has


#### GET routes

 
> *Get the information of all the animes in the database*

```http
https://yourroute.yourdomain/anime/all
```

> *Get the information of a given anime. Giving its **id** as a param*

```http
https://yourroute.yourdomain/anime/<animeId>
```

> *Get all the genres available in the database*


```http
https://yourroute.yourdomain/anime/genre/all
```

> *Get the animes that have a certain genre, by giving its **name** as a parameter*

```http
https://yourroute.yourdomain/anime/genre/<genre>
```

> *Get all the episodes of an anime, by giving the anime's **id** as a parameter*

```http
https://yourroute.yourdomain/anime/<animeId>/episode/all
```

> *Get a certain episode of the given anime, by giving its **name** and the **episode's number** as parameters*

```http
https://yourroute.yourdomain/anime/<animeId>/episode/<episodeNumber>
```

> *Get all the animes that the given studio has, by giving its **name** as the parameter*
```http
https://yourroute.yourdomain/anime/studio/<studio>
```


#### POST routes

```http
https://yourroute.yourdomain/user/<userId>/profiles/new
```
```json
// body for https://yourroute.yourdomain/user/<userId>/profiles/new
{
	"image":"url"

}
```



#### PUT routes

#### DELETE 


# Is it usable?

Well, yes, it is usable. I do use it in the another project shown in this reepository and it is fully functional in those projects, **BUT these projects are made just for praticing python, Flask, MySQL, Svelte, etc. So I do not reccoment use it in a project that is not just for practicing something.** I do not verify a lot of things, I do not use a token based authentication, I do not use Authorizations headers, I do not encrypt nothing, and more things like that. And of course, surely there are a ton of errors that i did not see when i was coding them.

#### *So, What can i do with this project?*

Nothing but see the code of something that you have not done before and you want to know a way to do it or you have a practice front-end project that fits with this API and you do not want to code a back-endT






## License
This project is under the lincese **Creative Common Zero**. [Learn more about it here](https://creativecommons.org/public-domain/cc0/)
