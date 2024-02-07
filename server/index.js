require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { getAll, getById, getByFilters } = require('../utils/pg.js')
const { reportQuery, reportParams } = require ('../middlewares/middlewares.js')
const { prepareHATEOAS } = require('../utils/hateoas.js')
const app = express()
const PORT = process.env.PORT ?? 3000

app.use(express.json())
app.use(cors())

app.get('/joyas',reportQuery, async (req, res) => {
	const joyas = await getAll(req.query)
	const HATEOAS = await prepareHATEOAS(joyas)
	res.json(HATEOAS)
})
app.get("/joyas/filtros", reportQuery, async (req, res) => {
	const joyas = await getByFilters(req.query)
	res.json(joyas)
})
app.get("/joyas/joya/:id", reportParams, async (req, res) => {
	const joya = await getById(req.params.id)
	res.json(joya)
})

app.all('*', (_, res) => res.status(404).json({ code: 404, message: 'Recurso no encontrado' }))

app.listen(PORT, () => console.log('http://localhost:' + PORT))

module.exports = app
