const express = require('express');
const cors = require("cors")
const app = express();

const port = process.env.PORT || 8080

app.use(cors())

app.use(express.json())


app.get('/', (req, res) => {
    res.send(' cup_story server is created.')
})

app.listen(port, () => {
    console.log(`The server is running on ${port}`)
})