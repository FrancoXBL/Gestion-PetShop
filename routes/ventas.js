const router = require('express').Router()

router.get('/nueva-venta', (req, res) =>{
    res.render('ventas')
})
router.post('/nueva-venta', (req, res) =>{
    const data = req.body
    console.log(data)
})

module.exports = router