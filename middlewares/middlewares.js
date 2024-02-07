const reportQuery = async (req, _, next) => {
  const queryParams = req.query
  const url = req.url
  console.log(`=============================================================\n${new Date()} \nruta: ${url}\nqueries: `,queryParams)
  next()
}
const reportParams = async (req, _, next) => {
  const parameters = req.params
  const url = req.url
  console.log(`=============================================================\n${new Date()}\nruta: ${url}\nparámetros:`,parameters)
  next()
}
module.exports = {
  reportQuery,
  reportParams
}
