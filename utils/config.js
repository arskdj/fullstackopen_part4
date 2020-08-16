require('dotenv').config()

let PORT = 3003
let DB_URI = process.env.DB_URI

if (process.env.NODE_ENV === 'test'){
   DB_URI = process.env.TEST_DB_URI 
}

module.exports = {
    PORT,
    DB_URI
}
