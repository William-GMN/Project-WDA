const express = require("express")
const app = express()
const PORT = 8080;
const path = require("path")

//const { createDBFromJSON } = require('./Database')
//createDBFromJSON()

const stores = require("./stores.json");

app.use(express.static(path.join(__dirname, "../Frontend")));

// Routing
app.get("/stores", (req, res) => {
    res.json(stores)
})

// Basic server setup
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend/HTML/Home.html"))
})

app.listen(PORT, () => {
    console.log(`Server running att http://${PORT}`)
})

app.use(express.static(path.join(__dirname, "../Frontend")))

