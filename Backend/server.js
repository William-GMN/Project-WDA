const express = require("express")
const app = express()
const PORT = 8080;
//const cors = require("cors")

app.get("/", (req, res) => {
    res.send("Welcome to the REST API")
})

app.listen(PORT, () => {
    console.log(`Server running att http://${PORT}`)
})

app.use("/", express.static('public'))