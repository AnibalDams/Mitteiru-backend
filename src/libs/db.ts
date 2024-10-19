//import {Database} from "bun:sqlite"
import {Database} from '@sqlitecloud/drivers'


const database = new Database("sqlitecloud://nxyx0mkihk.sqlite.cloud:8860/db.sqlite?apikey=49GbSAn6kBG5RoH6wOeTHHv4sZRTyNDRCUlaPU7tYSQ")
export default database