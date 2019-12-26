const express = require("express")
const fs = require("fs-extra")
const path = require("path")


const filePath = path.join(__dirname, "movies.json")

console.log(filePath)

const getMovies = async () => {
    const buffer = await fs.readFile(filePath)
    return JSON.parse(buffer.toString())
}

const router = express.Router();


router.get("/", async (req, res) => {
    const movies = await getMovies()
    res.send(movies)
})

router.get("/:id", async (req, res) => {
    const movies = await getMovies()
    const movie = movies.find(movie => movie.imdbID === req.params.id)
    res.send(movie)
})



module.exports = router;