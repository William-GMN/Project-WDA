const express = require("express")
const app = express()
const PORT = 8080;
const path = require("path")
//const cors = require("cors")

// Routing
app.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend/HTML/Home.html"))
})

// Basic server setup
app.get("/", (req, res) => {
    res.send("Welcome to the REST API")
})

app.listen(PORT, () => {
    console.log(`Server running att http://${PORT}`)
})

app.use(express.static(path.join(__dirname, "../Frontend")))