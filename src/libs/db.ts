//import {Database} from "bun:sqlite"
import {Database} from '@sqlitecloud/drivers'

const url = process.env.DATABASE?process.env.DATABASE:""

const database = new Database(url)
export default database