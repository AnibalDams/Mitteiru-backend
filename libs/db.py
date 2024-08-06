import mysql.connector

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Dams400gonzalo150.",
    database="pruebas"
)
dbCursor=db.cursor(buffered=True)


