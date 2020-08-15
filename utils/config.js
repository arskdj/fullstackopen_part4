require('dotenv').config()

const PORT = 3003
const DB_URI = process.env.DB_URI

module.exports = {
    PORT,
    DB_URI
}
