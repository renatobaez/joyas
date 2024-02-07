require('dotenv').config()
const { Pool } = require('pg')
const config = {
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  allowExitOnIdle: true
}

const pool = new Pool(config)

const genericQuery = (query, values) => pool
  .query(query, values)
  .then(({rows}) => rows)
  .catch(({code, message}) => ({code, message}))

const getAll = async ({ limits = 5, order_by = "id_ASC", page = 1}) => {
  const [campo, direccion] = order_by.split("_")
  const offset = (page - 1) * limits
  return await genericQuery('SELECT * FROM inventario order by $1 $2 LIMIT $3 OFFSET $4;', [campo, direccion, limits, offset])
}
const getById = async (id) => await genericQuery('SELECT * FROM inventario WHERE id = $1;', [id])
const getByFilters = async ({ precio_min, precio_max, categoria, metal }) => {
  let filters = []
  let values = []
  let query = "SELECT * FROM inventario"
  const addFilter = (field, comparator, value) => {
    values.push(value)
    const { length } = filters
    filters.push(`${field} ${comparator} $${length + 1}`)
  }
  if (precio_min) addFilter('precio', '>=', precio_min)
  if (precio_max) addFilter('precio', '<=', precio_max)
  if (categoria) addFilter('categoria', '=', categoria.toLowerCase())
  if (metal) addFilter('metal', '=', metal.toLowerCase())
  if (filters.length > 0) {
    filters = filters.join(" AND ")
    query += ` WHERE ${filters};`
  }
  return await genericQuery(query, values)
}

module.exports = {
    getAll,
    getById,
    getByFilters
}
