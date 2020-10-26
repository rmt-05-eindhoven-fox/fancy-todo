const router = require('express').Router()

router.get('/', (req, res) => {
    res.status(200).json({
        "testing":"qwerty"
    })
})

module.exports = router