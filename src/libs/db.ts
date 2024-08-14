import {Database} from "bun:sqlite"


const database = new Database("db.sqlite",{create: true})
export default database