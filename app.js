const express = require('express')
const app = express()
const port = 3000


app.get('/todos', (req,res) => {
    res.status(201).json([
        {
            id: 1,
            title: "api server",
            description: "learn how to do api server",
            status: "on progress",
            due_date: "2020-10-27"
        },
        {
            id: 2,
            title: "server",
            description: "learn how to do server",
            status: "hasn't started",
            due_date: "2020-10-27"
        }
    ])
})

app.listen(port, () => {
    console.log(`i love you ${port}`)
})

