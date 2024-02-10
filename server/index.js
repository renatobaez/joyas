require('dotenv').config()
const express = require('express')
const { getJoyas, getJoyasById, getJoyasByFilters } = require('../utils/pg.js')
const { reportQuery, reportParams } = require('../middlewares/middlewares.js')
const { prepareHATEOAS } = require('../utils/hateoas.js')
const app = express()
const PORT = process.env.PORT ?? 3000

app.use(express.json())

app.get('/joyas', reportQuery, async (req, res) => {
	const result = await getJoyas(req.query)
	if (result.code != undefined) {
		res.json(result)
	} else {
		const HATEOAS = await prepareHATEOAS(result)
		res.json(HATEOAS)
	}
})
app.get("/joyas/filtros", reportQuery, async (req, res) => {
	const joyas = await getJoyasByFilters(req.query)
	res.json(joyas)
})
app.get("/joyas/joya/:id", reportParams, async (req, res) => {
	const joya = await getJoyasById(req.params.id)
	console.log(joya.length)
	if (joya.length > 0) {
		res.json(joya)
	} else {
		if (joya.length === undefined) {
			res.json(joya)
		} else {
			res.status(404).json({ code: 404, message: 'Recurso no encontrado' })
		}
	}
})

app.all('*', (_, res) => res.status(404).json({ code: 404, message: 'Recurso no encontrado' }))

app.listen(PORT, () => console.log('http://localhost:' + PORT))

module.exports = app
