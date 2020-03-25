const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(3333)

/*
    SQL : MySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL Server
        Driver : SELECT * FROM users
        Query Builder : table('users').select('*')
    NoSQL : MongoDB, CouchDB
*/


