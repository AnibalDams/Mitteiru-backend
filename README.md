# What does this API do?

> [!TIP]
> **I'd love it if you could give me any kind of feedback or advice about this project that could help me as a programmer.**

> [!NOTE]
> **You must have already installed MySQL, flask, and the MySQL Driver for python for the correct functioning of the API**

This API provides you **a variety of routes to build an anime streaming app** (In any platforms). It makes your app able to:

- create users
- login
- update those users' data
- delete users
- create profiles
- update profiles
- delete profiles
- create animes
- look at those animes' information
- update those animes' information
- delete a given anime
- add episodes to an anime
- watch that episode
- Add animes to a list dedicated to each user
- delete those animes from that list
- see the genres that are available in the API
- see what animes have that genre
- see the animes of a certain studio

> [!NOTE]
> **These are the features that are available until a certain point in the development, more features can be added later, and if that is so, they will be listed here**

# Is it usable?

Well, yes, it is usable. I do use it in the project shown in [this repository](https://github.com/AnibalDams/Mitteiru) and it is fully functional in those projects, **BUT these projects are made just for praticing python, Flask, MySQL, Svelte, etc. So I do not reccoment use it in a project that is not just for practicing something.** I do not verify a lot of things, I do not use a token based authentication, I do not use Authorizations headers, I do not encrypt nothing, and more things like that. And of course, surely there are a ton of errors that i did not see when i was coding them.

#### *So, What can i do with this project?*

Nothing but see the code of something that you have not done before and you want to know a way to do it or you have a practice front-end project that fits with this API and you do not want to code a back-end.

# How to install?

### Install the dependencies

```bash
pip install -r requirements.txt
```

### Run the project

```bash
python index.py
```

> [!WARNING]
> **You have to make sure that you have installed mysql in your system and change the values in the database connection function in the libs/db.py file for your database's name, your user, and your password.**

> [!WARNING]
> **In your database, You have to already have all the needed tables to the correct functioning of the API**

### Database Connection

```python

db = mysql.connector.connect(
    host="hostname",
    user="Your user",
    password="Your password",
    database="Your database's name"
)

```

### Needed Tables

- **Animes - columns:**
  - **name**
  - **synopsis**
  - **releaseYear**
  - **studio**
  - **cover**
  - **image**
  - **onGoing**
  - **horizontal_image**
  - **views_**
- **Genres - columns:**
  - **name**
  - **anime_id**
- **Genre - columns:**
  - **name**
- **Lists - columns:**
  - **profile_id**
  - **anime_id**
  - **anime_title**
  - **anime_synopsis**
  - **anime_cover**
  - **anime_image**
- **Users - columns:**
  - **username**
  - **email**
  - **password_**
  - **admin**
- **Profiles - columns:**
  - **user_id**
  - **photo**
  - **name**

> [!NOTE]
> **These tables can be changed, updated, or deleted during the development, if that is so, The new changes will be added here**