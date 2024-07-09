import mysql.connector

db = mysql.connector.connect(
    host="localhost",
    user="user",
    password="password",
    database="database"
)
dbCursor=db.cursor(buffered=True)


