const express = require("express")
const moviesRouter = require("./src/services/movies")
//const commentsRouter = require("./src/comments")
const cors = require("cors")
require('dotenv').config()

const server = express();

var whitelist = ['http://localhost:3000', 'http://localhost:3001', 
                 'http://m5-d7-oct19-fe.herokuapp.com', 'https://vennbook.herokuapp.com', 'http://vennbook.herokuapp.com', 'https://m5-d7-oct19-fe.herokuapp.com', process.env.FE_URL]
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

// this allows HEROKU (or whatever else cloud system) to select the PORT that is free for him
const port = process.env.PORT || 3005

/* console.log(process.env.USER)
console.log(process.env.FE_URL) */

//server.use()
server.use(express.json())

server.use("/media", cors(corsOptions), moviesRouter)
//server.use("/comments", commentsRouter)


server.listen(port, () => {
    console.log("I'm listening on port " + port)
})









/* const express = require("express")
const moviesRouter = ("./src/services/movies")

const server = express()


const port = 3008
server.use(express.json())


server.use("/movies", moviesRouter)


server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
}); */