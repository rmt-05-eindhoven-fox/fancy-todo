const router = require('express').Router();

router.get('/todos', (req, res) => {
    res.status(200).json([{
        title: 'NgeGym',
        description: 'fitness',
        status: 'Undone',
        due_date: 1234
    }])
})

module.exports = router