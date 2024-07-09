from libs import db


class User:
    def __init__(self,username="",email="",password_="",admin=0):
        self.username=username
        self.email=email
        self.password_=password_
        self.admin=admin

    def create(self):
        createUserQuery="INSERT INTO Users(username,email,password_,admin) VALUES(%s,%s,%s,%s)"

        doesTheUsernameExistQuery="SELECT*FROM Users WHERE username=%s"
        
        doesTheEmailExistQuery="SELECT*FROM Users WHERE email=%s"
        
        db.dbCursor.execute(doesTheUsernameExistQuery,[self.username])
        
        doesTheUsernameExist=db.dbCursor.fetchall()
        
        db.dbCursor.execute(doesTheEmailExistQuery,[self.email])
        
        doesTheEmailExist=db.dbCursor.fetchall()
        
        if len(doesTheUsernameExist) >0 or doesTheUsernameExist !=[]:
            return {"message":"The username is already taken"}
        
        elif len(doesTheEmailExist) >0 or doesTheEmailExist !=[]:
            return {"message":"The email is already taken"}
        
        db.dbCursor.execute(createUserQuery,[self.username,self.email,self.password_,self.admin])
        
        db.db.commit()
        
        return {"Message":"The user has been added, Welcome"+" "+self.username}
    
    def login(self):
        getUserQuery="SELECT*FROM Users WHERE email=%s AND password_=%s"
        db.dbCursor.execute(getUserQuery,[self.email,self.password_])
        user = db.dbCursor.fetchone()
        
        if not user:
            return{"message":"Invalid email or password"}
        return {"message":"Welcome back" +" "+user[1],"user":{"id":user[0],"username":user[1],"email":user[2],"admin":user[4]}}
    
    def getUserById(self,id):
        getUserByIdQuery="SELECT * FROM Users WHERE id=%s"
        db.dbCursor.execute(getUserByIdQuery,[id])
        return {"user":db.dbCursor.fetchone()}
