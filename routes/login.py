from classes import users


def get(userData):
    
    user = users.User(email=userData["email"],password_=userData["password"])


    return user.login()