require('dotenv').config()

const express = require("express")
const router = require("./routes/index")
const cors = require('cors')

const errorHandler = require("./middleware/errorHanlder.middleware")
const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(router)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
})

