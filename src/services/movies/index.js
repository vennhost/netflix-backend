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
    if (movie) {
        res.send(movie)
    }
    else {
        res.status(404).send(`Movie ${req.params.id} not found`)
    }
    
})

router.post("/", async (req, res) => {
    const movies = await getMovies()
    const newMovie = {
        ...req.body,
        imdbID: "tt"+new Date().valueOf()
    }

    movies.push(newMovie)
    await fs.writeFile(filePath, JSON.stringify(movies))

    res.send("created")
})

router.put("/:id", async (req, res) => {
    const movies = await getMovies()
    const movie = movies.find(movie => movie.imdbID === req.params.id)

    if (movie) {
        const position = movies.indexOf(movie);
        const movieUpdated = Object.assign(movie, req.body)
        movies[position] = movieUpdated;
        await fs.writeFile(filePath, JSON.stringify(movies))
        res.send(`movie ${movie.imdbID} update successful`)
    } else {
        res.send("Movie not found")
    }
    
})

router.delete("/:id", async (req, res) => {
    const movies = await getMovies()
    const moviesRemaining = movies.filter(movie => movie.imdbID !== req.params.id)

   

    if (moviesRemaining.length === movies.length) {
        res.status(404).send(`Movie ${req.params.id} can not be found`)
    }
     else {
         await fs.writeFile(filePath, JSON.stringify(moviesRemaining))
        res.send("Deleted Succesfully")
    }
    
})



module.exports = router;