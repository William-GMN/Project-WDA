const express = require("express")
const app = express()
const PORT = 8080;
const path = require("path")
//const cors = require("cors")
const stores = require("./stores.json");

app.use(express.static(path.join(__dirname, "../Frontend")));

// Routing
app.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend/HTML/Home.html"))
})

app.get("/stores", (req, res) => {
    res.json(stores)
})

// Basic server setup
app.get("/", (req, res) => {
    res.send("Welcome to the REST API")
})

app.listen(PORT, () => {
    console.log(`Server running att http://${PORT}`)
})

app.use(express.static(path.join(__dirname, "../Frontend")))