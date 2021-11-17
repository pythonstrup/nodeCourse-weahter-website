//  nodemon src/app.js -e js,hbs

const path = require("path")
const express = require("express")
const hbs = require("hbs")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// Setup handlebars engine and views location
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Park",
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About me",
        name: "Park"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        helpText: "This is some helpful text.",
        name: "Park"
    })
})

app.get("/weather", (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "You must provide a address term"
        })
        
    } else {
        geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
            if(error){
                return res.send({ error })
            }

            forecast(latitude, longitude, (error, forecastData) => {
                if(error){
                    return res.send({ error })
                }

                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
            })
        })
    }
})

app.get("/products", (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    } else {

    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get("/help/*", (req, res) => {
    res.render("help-not", {
        title: "404",
        errorMessage: "Help article not found",
        name: "error Park"
    })
})

app.get("*", (req, res) => {
    res.render("404page", {
        title: "404 page",
        name: "Park",
        errorMessage: "Page not found"
    })
})

/*app.listen(3000, () => {
    console.log("Server is up on port 3000.")
})*/

app.listen(port, () => {
    console.log("Server is up on port " + port)
})