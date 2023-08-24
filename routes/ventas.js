const router = require('express').Router()

let ventasDiarias = []

router.get('/nueva-venta', (req, res) =>{
    res.render('ventas')
})
router.get('/caja-diaria', (req, res) =>{
    res.render('caja-diaria', {ventasDiarias})
})
router.post('/nueva-venta', (req, res) =>{
    const data = req.body
    const tipo = data.slice(-1)
    data.map((item) => {
        let senditem = {...item, ...tipo[0]}
        ventasDiarias.push(senditem)
    })
    ventasDiarias.pop()
})

module.exports = router