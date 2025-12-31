

export default function verifyFields(fields:string[]):Boolean{
    for (let i = 0; i < fields.length; i++) {
        const field = fields[i];
        if (field == ""|| !field){
            return false
        }
    }
    return true

}