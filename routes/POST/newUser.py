from classes import users

def create(userData):
    newUser = users.User(username=userData["username"],email=userData["email"],password_=userData["password"],admin=userData["admin"])
    return newUser.create()